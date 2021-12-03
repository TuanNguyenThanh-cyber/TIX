export function getHoursAndMins(stringDate, bonusHours) {
  // bonusHours: that means get hours and mins then plus it to bonusHours
  let dateObj = new Date(stringDate);
  let hour = dateObj.getHours();
  let min = dateObj.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  if (bonusHours) {
    hour += bonusHours;
    if (hour >= 24) {
      hour -= 24;
    }
  }
  return hour.toString() + ":" + min.toString() + " ";
}

export function getDate(stringDate) {
  let dateObj = new Date(stringDate);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  return `${date.toString()}/${month.toString()}/${year.toString()}`;
}
