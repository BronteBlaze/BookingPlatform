import game from "../../assets/game.png";
import park from "../../assets/park.webp";
import snacks from "../../assets/snacks.png";
import tour from "../../assets/tour.avif";

const AboutInfo = () => {
  return (
    <div className="bg-fuchsia-800 xl:px-40 md:px-20 px-8 py-20">
      <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center gap-10 text-white">
        <div>
          <div className="lg:text-5xl text-3xl">
            <h2>What is Levelup Gaming Lounge</h2>
          </div>
          <div className="mt-6 text-xl">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
              error fugit nihil doloremque nemo assumenda doloribus expedita
              laboriosam consequuntur nam repellat, architecto eius! Rem a natus
              molestias ea explicabo exercitationem minima ducimus tempore
              reiciendis est?
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
          <div>
            <img src={game} alt="game" />
          </div>
          <div>
            <img src={tour} alt="game" />
          </div>
          <div>
            <img src={snacks} alt="game" />
          </div>
          <div>
            <img src={snacks} alt="game" />
          </div>
          <div>
            <img src={park} alt="game" />
          </div>
          <div>
            <img src={tour} alt="game" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
