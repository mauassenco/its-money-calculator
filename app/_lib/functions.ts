

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
    totalInterestEarned: totalInterestEarned, // Round to two decimal places
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

export const formatNumberWithSeparators = (number: number) => {

  // Format the number with thousands separators (pt-BR locale)
  const formattedNumber = number.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

  // Split the formatted number at the decimal point
  const [integerPart, fractionalPart] = formattedNumber.split('.');

  // Extract the desired numbers
  const extractedInteger = integerPart.replace(/,/g, ''); // Remove separators
  const extractedDecimalDigit = fractionalPart ? fractionalPart[0] : '0'; // Handle cases without decimals

  // Combine and return the extracted numbers
  // return `${extractedInteger}.${extractedDecimalDigit}`;
  if (extractedDecimalDigit == '0') {
   return extractedInteger
  }
  
  return `${extractedInteger}.${extractedDecimalDigit}`
};
