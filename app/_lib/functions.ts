

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
  const formattedNumber = number.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  const [integerPart, fractionalPart] = formattedNumber.split('.');
  const extractedInteger = integerPart.replace(/,/g, '');
  const extractedDecimalDigit = fractionalPart ? fractionalPart[0] : '0'; 
  
  if (extractedDecimalDigit == '0') {
   return extractedInteger
  }
  return `${extractedInteger}.${extractedDecimalDigit}`
};

export const formatMoney = (value: number) => {   
  // return `R$${Intl.NumberFormat().format(value)}`;
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formattedNumber = formatter.format(value);

  return formattedNumber

};