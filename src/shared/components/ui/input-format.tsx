import React from "react";
import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

const InputFormatCurrency = ({
  ...props
}: NumericFormatProps<InputAttributes>) => {
  return (
    <NumericFormat
      className="h-10 w-full min-w-0 rounded border border-slate-400 focus:border-primary transition-all px-3 py-1 text-sm font-medium outline-none bg-white focus-primary"
      thousandSeparator
      {...props}
    />
  );
};

export default InputFormatCurrency;
