// Validation for the two documents the grant-doc generator expects back from
// the LLM (Groq). Pulled into a pure, unit-tested helper because the route that
// uses it runs a DESTRUCTIVE `grant_documents.delete()` for the grant right
// before inserting the new docs. `grant_documents.content` is `text NOT NULL`,
// so a response that is valid JSON but missing or empty on a required field
// (e.g. the 70B model truncates against the token cap and returns only
// `{"loi":"..."}`) used to slip past a bare `JSON.parse`: the delete fired, the
// follow-up insert hit the NOT NULL constraint, and the grant was left with NO
// documents at all. Validate the shape BEFORE anything is deleted so a bad
// upstream response is a no-op, not data loss.

export interface GrantDocs {
  loi: string
  narrative: string
}

/** Thrown when the model response isn't a usable {loi, narrative} pair. */
export class GrantDocsParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GrantDocsParseError'
  }
}

function requireNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new GrantDocsParseError(`Model response is missing the "${field}" document`)
  }
  return value
}

/**
 * Parse and validate the raw LLM response string into a complete {loi,
 * narrative} pair. Throws GrantDocsParseError (never returns a partial object)
 * so callers can bail out before performing any irreversible write.
 */
export function parseGrantDocs(content: string): GrantDocs {
  let raw: unknown
  try {
    raw = JSON.parse(content)
  } catch {
    throw new GrantDocsParseError('Model returned invalid JSON')
  }

  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new GrantDocsParseError('Model response was not a JSON object')
  }

  const obj = raw as Record<string, unknown>
  return {
    loi: requireNonEmptyString(obj.loi, 'loi'),
    narrative: requireNonEmptyString(obj.narrative, 'narrative'),
  }
}
