import video_game from "../../assets/game_video.mp4";
import Button from "../../components/Button";
import Video from "../../components/Video,";
import { FaBars } from "react-icons/fa";

const BookNow = () => {
  return (
    <div>
      <div className="relative overflow-hidden video_container">
        <Video video_file={video_game} className="hidden md:block" />
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-brightness-50 bg-black/50">
          <span className="invisible">Game</span>
        </div>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-white">
          <div className="xl:text-7xl text-5xl font-semibold">
            <h1>THE LEVELUP GAMING</h1>
          </div>
          <div className="py-8 text-2xl">
            <p>Favourite place to play your favourite games</p>
          </div>
          <Button title="Book Now" className="px-10" />
        </div>
      </div>
    </div>
  );
};

export default BookNow;
