import numeral from 'numeral';

export const formatDisplayCurrency = (
  value: number,
  format: string = '0,0.[00]'
) => {
  return `${numeral(value).format(format)}`;
};
