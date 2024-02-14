const ShopItem = ({ img_file, isGame }) => {
  return (
    <div>
      <div>
        <img src={img_file} alt="game" width={`${!isGame ? 300 : 500}`} />
      </div>
      <div className="mt-3">
        <div>
          Name: <span></span>
        </div>
        {!isGame && (
          <div>
            Price: <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopItem;
