const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  name,
  register,
}) => {
  return (
    <label className="flex flex-col gap-2 cursor-pointer">
      <span className="text-sm text-gray-700">{label}</span>

      <div className="relative">
        <input type="checkbox" className="sr-only peer" {...register(name)} />

        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-primary transition-colors"></div>

        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-6 transition-transform"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
