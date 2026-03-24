type Props = {
  label: string
  options: string[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FormSelect = ({ label, options, value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">
        <span className="font-avenirLtStd text-neutral-400 uppercase text-sm">{label}</span>
      </label>

      <select
        value={value ?? ''}
        onChange={onChange}
        className="w-full select select-bordered text-neutral-400 select-primary bg-base-100"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>

        {options.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormSelect