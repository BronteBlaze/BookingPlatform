import { Select } from "antd";

const duration = [
  { value: "1 Hour", label: <span>1 Hour</span> },
  { value: "2 Hour", label: <span>2 Hour</span> },
  { value: "3 Hour", label: <span>3 Hour</span> },
  { value: "4 Hour", label: <span>4 Hour</span> },
  { value: "5 Hour", label: <span>5 Hour</span> },
];

const SelDeviceAndDuration = ({ setDevice, setDuration }) => {
  return (
    <div className="text-white mt-12 px-8">
      <div>
        <div className="text-lg">
          <span>Please Select Device</span>
        </div>
        <Select
          style={{ width: "50%" }}
          className="mt-2"
          defaultValue="Select Device"
          options={[
            { value: "PC", label: <span>PC</span> },
            { value: "PS", label: <span>PS</span> },
          ]}
          onChange={(event) => setDevice(event)}
        />
      </div>
      <div className="mt-6">
        {" "}
        <div className="text-lg">
          <span>Please Select Duration</span>
        </div>
        <Select
          style={{ width: "50%" }}
          className="mt-2"
          defaultValue="Select Hour"
          options={duration}
          onChange={(event) => setDuration(event)}
        />
      </div>
    </div>
  );
};

export default SelDeviceAndDuration;
