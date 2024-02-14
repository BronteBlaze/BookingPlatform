import { useState } from "react";
import video_game from "../../assets/video_game.mp4";
import Video from "../../components/Video,";
import Button from "../../components/Button";
import { Collapse } from "react-collapse";
import { useNavigate } from "react-router";

const GameAvail = () => {
  const [showMoreGame, setShowMoreGame] = useState(false);
  const navigate = useNavigate();

  const setShowMoreGameHandler = () => {
    setShowMoreGame(true);
  };

  return (
    <div className="xl:px-40 md:px-20 px-8 flex justify-center">
      <div>
        <div className="text-center py-12 text-3xl underline">
          <h2>Games Available</h2>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <Video video_file={video_game} width={400} />
          <Video video_file={video_game} width={400} />
          <Video video_file={video_game} width={400} />
        </div>
        <Collapse isOpened={showMoreGame}>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4">
            <Video video_file={video_game} width={400} />
            <Video video_file={video_game} width={400} />
            <Video video_file={video_game} width={400} />
            {/* Add other videos here */}
          </div>
        </Collapse>
        <div className="text-center py-12">
          <Button
            title={!showMoreGame ? "More" : "See All Games"}
            onClick={
              !showMoreGame ? setShowMoreGameHandler : () => navigate("/games")
            }
            className="px-10"
          />
        </div>
      </div>
    </div>
  );
};

export default GameAvail;
