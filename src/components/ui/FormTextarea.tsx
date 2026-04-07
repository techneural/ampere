type Props = {
  label: string
  placeholder?: string
  value?: string
  maxLength?: number
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextarea = ({
  label,
  placeholder,
  value,
  onChange,
  maxLength = 500,
  required = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">
        <span className="font-avenirLtStd text-neutral-400 uppercase text-sm">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full textarea textarea-primary textarea-bordered bg-base-100"
        maxLength={maxLength}
        rows={4}
      />
    </div>
  )
}

export default FormTextarea
