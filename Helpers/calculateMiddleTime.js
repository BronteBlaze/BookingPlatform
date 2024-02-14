const calculateMiddleTime = (
  durationValue,
  startTimeSuffix,
  endTimeSuffix,
  startTimeValue,
  endTimeValue
) => {
  let i = 0;
  let allTimeValue = [];

  while (i < durationValue) {
    let middleTimeValue = startTimeValue + i;
    // allTimeValue.push(middleTimeValue);

    if (startTimeSuffix == "AM" && endTimeSuffix == "AM") {
      let middleTime = `${middleTimeValue}:00AM`;
      allTimeValue.push(middleTime);
    }

    if (startTimeSuffix == "PM" && endTimeSuffix == "PM") {
      let middleTime = `${middleTimeValue}:00PM`;
      allTimeValue.push(middleTime);
    }

    if (startTimeSuffix == "AM" && endTimeSuffix == "PM") {
      if (middleTimeValue < 12) {
        // console.log("Hello");
        middleTime = `${middleTimeValue}:00AM`;
      } else if (middleTimeValue == 12) {
        middleTime = `${middleTimeValue}:00PM`;
      } else {
        middleTimeValue = middleTimeValue - 12;
        middleTime = `${middleTimeValue}:00PM`;
      }
      allTimeValue.push(middleTime);
    }

    if (startTimeSuffix == "PM" && endTimeSuffix == "AM") {
      if (middleTimeValue < 12) {
        middleTime = `${middleTimeValue}:00PM`;
      } else if (middleTimeValue == 12) {
        middleTime = `${middleTimeValue}:00AM`;
      } else {
        middleTimeValue = middleTimeValue - 12;
        middleTime = `${middleTimeValue}:00AM`;
      }
      allTimeValue.push(middleTime);
    }
    i++;
  }

  return allTimeValue;
};

module.exports = calculateMiddleTime;
