import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props) => {
  const { resData } = props;

  if (!resData) {
    // Return null if data is missing to avoid rendering empty cards
    return null;
  }

  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    sla,
  } = resData;

  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="res-logo"
        alt="res-logo"
        src={
          cloudinaryImageId
            ? `${CDN_URL}${cloudinaryImageId}`
            : "https://via.placeholder.com/150" // Default image if not available
        }
      />
      <h3 className="name-styling">{name || "Restaurant Name Not Available"}</h3>
      <h4 className="cuisines-styling">
        {cuisines?.length ? cuisines.join(", ") : "Cuisines Not Available"}
      </h4>
      <h4>Rating: {avgRating || "N/A"}</h4>
      <h4>Delivery Time: {sla?.slaString || "N/A"}</h4>
    </div>
  );
};

export default RestaurantCard;
