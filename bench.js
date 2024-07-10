// const number = 123456789
// const formattedNumber = number.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

// const [integerPart, fractionalPart] = formattedNumber.split('.');

// const extractedInteger = integerPart.replace(/,/g, '');
// const extractedDecimalDigit = fractionalPart[0];


// console.log(`${extractedInteger}.${extractedDecimalDigit}`);
const formatNumberToSingleDecimal = (number) => {

  // Format the number with thousands separators (pt-BR locale)
  const formattedNumber = number.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

  // Split the formatted number at the decimal point
  const [integerPart, fractionalPart] = formattedNumber.split('.');

  // Extract the desired numbers
  const extractedInteger = integerPart.replace(/,/g, ''); // Remove separators
  const extractedDecimalDigit = fractionalPart ? fractionalPart[0] : '0'; // Handle cases without decimals

  // Combine and return the extracted numbers
  console.log(extractedInteger, extractedDecimalDigit)


  return ((formattedNumber != 0) ? `${extractedInteger}.${extractedDecimalDigit}` : extractedInteger);
};

formatNumberToSingleDecimal(324252)