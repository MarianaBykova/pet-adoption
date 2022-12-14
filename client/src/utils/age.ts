export default function floatToYearsMonths(age: number): string {
  let array = age.toString().split('.')
  let years, months;
  
  if (array[1] == '1') {
    months = 'месяц'
  } else if (+array[1] > 4) months = 'месяцев';
  else months = 'месяца';

  if (array[0] == '0') return `${array[1]} ${months}`;
  
  if (array[0] == '1') {
    years = 'год';
  } else if (+array[0] > 4) years = 'лет';
  else years = 'года';

  if (array.length === 1) return `${array[0]} ${years}`
  
  return `${array[0]} ${years} ${array[1]} ${months}`
}
