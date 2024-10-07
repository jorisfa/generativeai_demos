import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled: boolean
}


const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, className, ...rest }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-900 hover:bg-blue-400 rounded-md focus:outline-none ${className}`}
      {...rest}
    >
        { children }
    </button>
  );
};

export default Button;
