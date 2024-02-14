const Video = ({ id, video_file, width, className }) => {
  return (
    <video
      loop
      autoPlay={true}
      muted
      width={`${width ? width : "100%"}`}
      height="100%"
      className={className}
    >
      <source src={video_file} type="video/mp4" />
    </video>
  );
};

export default Video;
