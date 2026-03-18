type Props = {
  label: React.ReactNode;
};

const FormCheckbox = ({ label }: Props) => {
  return (
    <label className="cursor-pointer flex items-start gap-2">
      <input
        type="checkbox"
        className="checkbox checkbox-primary size-7.5 rounded-[3px] checkbox-sm mt-1"
      />
      <h5 className="font-medium">{label}</h5>
    </label>
  );
};

export default FormCheckbox;
