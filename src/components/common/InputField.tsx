interface IProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string; 
  }
  
  const InputField: React.FC<IProps> = ({ label, name, value, onChange, error }) => {
    return (
      <div className="relative">
        <label htmlFor={name} className="block text-sm text-gray-700 text-left pb-2">
          {label}
        </label>
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && (
          <p className="absolute text-sm text-red-500 top-full mb-1 left-0">{error}</p>
        )}
      </div>
    );
  };
  
  export default InputField;
  