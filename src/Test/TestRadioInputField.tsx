import React from 'react';
import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const TestRadioInputField: React.FC<Props> = ({ input, meta }) => {
  const { name, onChange, value } = input;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <label>
        <input
          type="radio"
          name={name}
          value="radio-option-1"
          checked={value === 'radio-option-1'}
          onChange={handleInputChange}
        />
        Option 1
      </label>
      <br />
      <label>
        <input
          type="radio"
          name={name}
          value="radio-option-2"
          checked={value === 'radio-option-2'}
          onChange={handleInputChange}
        />
        Option 2
      </label>
      <br />
      {value === 'radio-option-2' && (
        <div>
          <input type="text" name={`${name}-text`} />
        </div>
      )}
    </>
  );
};

export default TestRadioInputField;
