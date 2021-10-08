const arrayConversion = (array, numberOfElement) => {
  let totalArray = [];
  let tempArray = [];
  array.map((item, index) => {
    if ((index + 1) % numberOfElement === 0) {
      tempArray.push(item);
      totalArray.push(tempArray);
      tempArray = [];
    } else {
      tempArray.push(item);
    }
  });

  totalArray.push(tempArray);

  return totalArray;
};

export default arrayConversion;
