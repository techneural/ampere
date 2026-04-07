type Props = {
  label: string
  placeholder?: string
  type?: string
  value?: string
  maxLength?: number
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  maxLength = 50,
  required = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">
        <span className="font-avenirLtStd text-neutral-400 uppercase text-sm">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full input input-primary input-bordered bg-base-100 max-sm:input-md"
      />
    </div>
  )
}

export default FormInput
