import React, { useEffect } from "react";
import { Calendar, theme, Select } from "antd";

const times = [
  { value: "10:00AM", label: <span>10:00AM</span> },
  { value: "11:00AM", label: <span>11:00AM</span> },
  { value: "12:00PM", label: <span>12:00PM</span> },
  { value: "1:00PM", label: <span>1:00PM</span> },
  { value: "2:00PM", label: <span>2:00PM</span> },
  { value: "3:00PM", label: <span>3:00PM</span> },
  { value: "4:00PM", label: <span>4:00PM</span> },
  { value: "5:00PM", label: <span>5:00PM</span> },
  { value: "6:00PM", label: <span>6:00PM</span> },
  { value: "7:00PM", label: <span>7:00PM</span> },
  { value: "8:00PM", label: <span>8:00PM</span> },
  { value: "9:00PM", label: <span>9:00PM</span> },
  { value: "10:00PM", label: <span>10:00PM</span> },
  { value: "11:00PM", label: <span>11:00PM</span> },
];

const SelTimeAndDate = ({
  setDateOfBooking,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  duration,
}) => {
  const dateTimeChangeHandler = (event) => {
    let month;
    let day;
    let lengthOfMonth = +event.$M.toString().length;
    let lengthOfDay = +event.$D.toString().length;

    if (lengthOfMonth === 1) {
      month = "0" + (event.$M + 1);
    } else {
      month = event.$M + 1;
    }

    if (lengthOfDay === 1) {
      day = "0" + event.$D;
    } else {
      day = event.$D;
    }

    let date = `${event.$y}-${month}-${day}`;
    setDateOfBooking(date);
  };

  useEffect(() => {
    const calculateEndTimeHandler = () => {
      let completeTime;
      let timeValue;
      let timeSuffix;

      if (duration && startTime) {
        timeValue = +startTime.split(":")[0];

        if (timeValue === 12) {
          if (startTime.split(":")[1].slice(2).toString() === "PM") {
            timeSuffix = "PM";
          }
        }

        timeValue += +duration.split(" ")[0];

        if (timeValue >= 12 && +startTime.split(":")[0] !== 12) {
          if (startTime.split(":")[1].slice(2).toString() === "AM") {
            timeSuffix = "PM";
          } else {
            timeSuffix = "AM";
          }
        } else {
          timeSuffix = startTime.split(":")[1].slice(2).toString();
        }

        if (timeValue > 12) {
          let diff = timeValue - 12;
          timeValue = diff;
        }

        completeTime = `${timeValue}:00${timeSuffix}`;
        setEndTime(completeTime);
      }
      return;
    };

    calculateEndTimeHandler();
  }, [duration, startTime, setEndTime]);

  return (
    <div className="mt-12 text-white md:px-8 px-3">
      <div className="grid md:grid-cols-9 grid-cols-1 gap-5">
        <div className="col-span-6">
          <Calendar
            className="w-full"
            fullscreen={false}
            onChange={dateTimeChangeHandler}
          />
        </div>
        <div className="w-full col-span-3">
          <div>
            <span className="w-full">Please Select Time</span>
            <Select
              className="mt-2 w-full"
              value={startTime ? startTime : "Select Time"}
              options={times}
              onChange={(event) => setStartTime(event)}
            />
            <div className="pt-6">
              <span>Final Time</span>
              <Select
                className="mt-2 w-full text-white"
                value={endTime || "Select Final Time"}
                options={times}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelTimeAndDate;
