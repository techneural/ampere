type Props = {
  label: string
  placeholder?: string
  type?: string
}

const FormInput = ({ label, placeholder, type = 'text' }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">
        <span className="font-avenirLtStd text-neutral-400 uppercase text-sm">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full input input-primary input-bordered bg-base-100 max-sm:input-md"
      />
    </div>
  )
}

export default FormInput
