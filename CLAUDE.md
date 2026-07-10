# The Plug AI — Claude Code Instructions

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First:** Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan:** Check in before starting implementation
3. **Track Progress:** Mark items complete as you go
4. **Explain Changes:** High-level summary at each step
5. **Document Results:** Add review section to `tasks/todo.md`
6. **Capture Lessons:** Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact:** Only touch what's necessary. No side effects with new bugs.

## /btw — Clarity Interview

Auto-trigger before executing any task where scope is fuzzy, the goal is ambiguous, or "done" isn't obviously measurable. Signals: "overhaul", "improve", "rethink", "make it better", multi-system changes.

Ask all four questions in ONE message, conversational tone:

1. **Goal / Why** — What outcome do you actually want? What's the business reason this matters?
2. **Constraints** — What must NOT change? What's already decided or off-limits?
3. **Success criteria** — How will you know when this is done and done *right*?
4. **Priority / Tradeoffs** — If something has to be cut, what matters most?

After the answers, synthesize into a brief and confirm:
```
Outcome:    [what we're building and why]
Guardrails: [what's off-limits / what stays fixed]
Done when:  [specific measurable finish line]
```

## Deployments

- **Live Website:** https://psychic-bassoon-cam6stef.vercel.app
- **Vercel Project:** cam6stef team, repo `morrisstephon51/psychic-bassoon`
- **Production Branch:** `main` (Vercel deploys production on every merge to main)
- **Keep-Awake:** Vercel Cron hits `/api/health` daily (09:00 UTC) so the Supabase free-tier project never pauses from inactivity
