import { Spin } from "antd";

const Button = ({ title, className, onClick, loading, type, disabled }) => {
  return (
    <button
      type={`${type ? type : "button"}`}
      className={` py-2 ${className} relative ${
        !disabled ? "bg-fuchsia-300 text-black" : "bg-gray-500 text-white"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>
        <span>{title}</span>
        {loading && (
          <span className="absolute right-3">
            <Spin />
          </span>
        )}
      </span>
    </button>
  );
};

export default Button;
