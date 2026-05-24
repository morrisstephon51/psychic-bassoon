import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-text-secondary">{label}</label>}
      <input
        className={cn(
          'w-full bg-surface-0 border border-surface-3 focus:border-accent rounded-lg px-3 py-2 text-sm text-text-primary',
          'placeholder:text-text-muted focus:outline-none transition-colors',
          error && 'border-danger',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-text-secondary">{label}</label>}
      <textarea
        className={cn(
          'w-full bg-surface-0 border border-surface-3 focus:border-accent rounded-lg px-3 py-2 text-sm text-text-primary',
          'placeholder:text-text-muted focus:outline-none transition-colors resize-none',
          error && 'border-danger',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-text-secondary">{label}</label>}
      <select
        className={cn(
          'w-full bg-surface-0 border border-surface-3 focus:border-accent rounded-lg px-3 py-2 text-sm text-text-primary',
          'focus:outline-none transition-colors',
          className
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
