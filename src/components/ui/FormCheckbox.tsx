type Props = {
  label: React.ReactNode
  className?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormCheckbox = ({ label, className, checked, onChange }: Props) => {
  return (
    <label className={`cursor-pointer flex items-start gap-2 ${className ? className : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox checkbox-primary size-7.5 rounded-[3px] checkbox-sm mt-1"
      />
      <h5 className="max-sm:text-sm font-medium">{label}</h5>
    </label>
  )
}

export default FormCheckbox