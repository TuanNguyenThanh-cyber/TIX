export default function hanldeListSeat(array, amountInRaw) {
  let count = 0;
  let arrayTemp = [];
  let resultArray = [];
  array.map((item, index) => {
    count++;
    if (count % amountInRaw === 0) {
      arrayTemp.push(item);
      resultArray.push(arrayTemp);
      arrayTemp = [];
    } else {
      arrayTemp.push(item);
    }
  });
  return resultArray;
}
