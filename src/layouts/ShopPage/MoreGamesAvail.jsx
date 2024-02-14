import ShopHeadTitle from "../../components/ShopHeadTitle";
import ShopItem from "../../components/ShopItem";
import cyberpunk from "../../assets/cyberpunk.webp";
import vapes from "../../assets/vapes.jpg";

const MoreGamesAvail = () => {
  return (
    <div className="xl:px-40 md:px-20 px-8 py-12 flex justify-center">
      <div>
        <ShopHeadTitle title="PC Games" />
        <div className="py-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          <ShopItem img_file={cyberpunk} isGame={true} />
          <ShopItem img_file={cyberpunk} isGame={true} />
          <ShopItem img_file={cyberpunk} isGame={true} />
          <ShopItem img_file={cyberpunk} isGame={true} />
        </div>
        <ShopHeadTitle title="Play Station Games" />
        <div className="py-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          <ShopItem img_file={cyberpunk} isGame={true} />
          <ShopItem img_file={cyberpunk} isGame={true} />
          <ShopItem img_file={cyberpunk} isGame={true} />
          <ShopItem img_file={cyberpunk} isGame={true} />
        </div>
      </div>
    </div>
  );
};

export default MoreGamesAvail;
