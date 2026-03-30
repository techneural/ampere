type Props = {
  label: React.ReactNode
  className?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const FormCheckbox = ({ label, className, checked, onChange, disabled = false }: Props) => {
  return (
    <label className={`cursor-pointer flex items-start gap-2 ${className ? className : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`
          checkbox checkbox-primary size-7.5 rounded-[3px] checkbox-sm mt-1
          ${disabled ? 'bg-gray-300 border-gray-400 opacity-100!' : ''}
        `}
        disabled={disabled}
      />
      <h5 className={`max-sm:text-sm font-medium ${disabled ? 'text-gray-400' : ''}`}>{label}</h5>
    </label>
  )
}

export default FormCheckbox
