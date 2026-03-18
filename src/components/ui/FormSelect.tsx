type Props = {
  label: string;
  options: string[];
};

const FormSelect = ({ label, options }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">
        <span className="font-avenirLtStd text-neutral-400 uppercase text-sm">
          {label}
        </span>
      </label>

      <select
        defaultValue=""
        className="w-full select select-bordered select-primary bg-base-100"
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
  );
};

export default FormSelect;
