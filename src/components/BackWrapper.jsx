import logo from "../assets/logo.jpg";

const BackWrapper = ({ children, className, no_absolute }) => {
  return (
    <div
      className={`${
        no_absolute
          ? "pb-20 xl:mx-28 mx-3 md:mx-20 lg:mx-5"
          : "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center pb-12"
      } ${className} pt-10 bg-fuchsia-800 text-white shadow-[24px_16px_0] shadow-fuchsia-300`}
    >
      <div className="flex justify-center">
        <img src={logo} alt="logo" width={120} />
      </div>
      <div className="mt-4 text-4xl text-center">
        <h2>LEVEL UP</h2>
      </div>
      {children}
    </div>
  );
};

export default BackWrapper;
