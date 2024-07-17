

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

export const formatMoney = (value: any) => {   
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formattedNumber = formatter.format(value);
  return formattedNumber
};

export const formatPhone = (value: string) => {
  const cleanedValue = value.replace(/[^0-9]/g, '')
  return cleanedValue
  .replace(/(\d{0})(\d)/, '$1($2')
  .replace(/(\d{2})(\d)/, '$1)$2')
  .replace(/(\d{5})(\d{1,2})/, '$1-$2')
  .replace(/(-\d{4})\d+?$/, '$1');
};

export const formatNumber = (value: any) => {
  const cleanedValue = value.replace(/[^0-9]/g, '')
  // const limitedValue = cleanedValue.slice(0, 3)
  return cleanedValue
};


export const formatToReais = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");

  return value
    .replace(/\D/g, "")
    .replace(/(\d{0})(\d)/, '$1R$ $2')
    .replace(/(\d)(\d{2})$/, "$1, $2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".")
};
