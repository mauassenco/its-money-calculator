

export const convertToLowerCamelCase = (text: string) => {
  const lowerCaseText = text.toLowerCase();
  const cleanWords = lowerCaseText.split(' ').filter(word => word.trim() !== '');
  const concatText = cleanWords.reduce((acc, currentWord, index) => {
    if (index === 0) {
      return currentWord;
    } else {
      return acc + '_' + currentWord;
    }
  }, '');
  return concatText;
};

export const calculateCompoundInterest = (principal: number, interestRate: number, timePeriod: number) => {
  interestRate /= 100;

  const totalPeriods = timePeriod * 12;

  const finalAmount = principal * ( Math.pow((1 + interestRate ), totalPeriods));

  const totalInterestEarned = finalAmount - principal;

  return {
    totalInterestEarned: totalInterestEarned.toFixed(2), // Round to two decimal places
  };
};

export const checkNumberType = (value:number) => {
  if (value >= 1000 && value < 1000000) {
    return 'mil';
  }else if (value >= 1000000) {
    if (value > 1999999) {
      return 'milhões'
    }
    return 'milhão';
  } else {
    return 'reais';
  }
};

export const formatNumberWithSeparators = (number) => {
  if (isNaN(number)) {
    throw new Error('Invalid input: Please provide a valid number.');
  }

  // Convert the number to a string
  const numberString = number.toFixed(2).toString();

  // Check if it's a negative number
  const isNegative = numberString.startsWith('-');

  // Remove the negative sign if present
  const absoluteNumberString = isNegative ? numberString.slice(1) : numberString;

  // Split the number into an integer part and a fractional part (if any)
  const [integerPart, fractionalPart] = absoluteNumberString.split(',');

  // Format the integer part with thousands separators
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine the formatted integer part and fractional part (if any)
  let formattedNumber = isNegative ? `-${formattedIntegerPart}` : formattedIntegerPart;
  if (fractionalPart) {
    formattedNumber += `.${fractionalPart}`;
  }

  return formattedNumber;
}