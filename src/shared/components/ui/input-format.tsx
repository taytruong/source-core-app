import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from 'react-number-format';

const InputFormatCurrency = ({
  ...props
}: NumericFormatProps<InputAttributes>) => {
  return (
    <NumericFormat
      thousandSeparator
      className="focus:border-primary focus-primary h-10 w-full min-w-0 rounded bg-white px-3 py-1 text-sm font-medium shadow-sm transition-all outline-none"
      {...props}
    />
  );
};

export default InputFormatCurrency;
