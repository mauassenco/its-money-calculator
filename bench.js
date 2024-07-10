const number = 123456789
const formattedNumber = number.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

const [integerPart, fractionalPart] = formattedNumber.split('.');

const extractedInteger = integerPart.replace(/,/g, '');
const extractedDecimalDigit = fractionalPart[0];


console.log(`${extractedInteger}.${extractedDecimalDigit}`);