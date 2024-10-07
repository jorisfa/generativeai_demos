import React, { useState, InputHTMLAttributes } from 'react'; // Import InputHTMLAttributes

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextField: React.FC<TextFieldProps> = (props) => {  // Use 'props' to access all attributes
  const [inputValue, setInputValue] = useState('');
  const { onChange, className, ...rest } = props;

  return (
    <input
      type="text"
      value={inputValue}
      onChange={onChange}
      {...props} // Spread the rest of the attributes to the <input> element
      className={`flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
    />
  );
};

export default TextField;
