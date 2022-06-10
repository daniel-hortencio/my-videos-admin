import { ChangeEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputTextProps {
  label: string;
  id: string;
  placeholder: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: any) => void;
  feedback?: string;
  onBlur?: () => void;
}

const InputText = ({
  label,
  id,
  placeholder,
  type,
  value,
  onChange,
  feedback,
  onBlur,
}: InputTextProps) => {
  const [hiddenPassword, setHiddenPassword] = useState(type === "password");

  return (
    <div className="mb-4">
      <label>{label}</label>
      {feedback && <span className="text-blue-500"> ({feedback})</span>}

      <div className="border-2 flex items-center p-2 focus-within:border-gray-500">
        <input
          className="border-0 outline-none w-full"
          id={id}
          type={
            hiddenPassword ? "password" : type === "password" ? "text" : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setHiddenPassword(!hiddenPassword)}
          >
            {hiddenPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputText;
