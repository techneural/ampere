type Props = {
  label: string;
  placeholder?: string;
};

const FormTextarea = ({ label, placeholder }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">
        <span className="font-avenirLtStd text-neutral-400 uppercase text-sm">
          {label}
        </span>
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full textarea textarea-primary textarea-bordered bg-base-100"
        rows={4}
      />
    </div>
  );
};

export default FormTextarea;