import ShopHeadTitle from "../../components/ShopHeadTitle";
import ShopItem from "../../components/ShopItem";
import nurf from "../../assets/nurf.jpg";
import vapes from "../../assets/vapes.jpg";

const GunsAndVapes = () => {
  return (
    <div className="xl:px-40 md:px-20 px-8 py-12 flex justify-center">
      <div>
        <ShopHeadTitle title="Nerf Guns" />
        <div className="py-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          <ShopItem img_file={nurf} />
          <ShopItem img_file={nurf} />
          <ShopItem img_file={nurf} />
          <ShopItem img_file={nurf} />
        </div>
        <ShopHeadTitle title="Vapes" />
        <div className="py-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          <ShopItem img_file={vapes} />
          <ShopItem img_file={vapes} />
          <ShopItem img_file={vapes} />
          <ShopItem img_file={vapes} />
        </div>
      </div>
    </div>
  );
};

export default GunsAndVapes;
