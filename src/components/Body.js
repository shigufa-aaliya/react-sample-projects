import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredRestaurant ,setFilteredRestaurant] = useState([]);

  const [searchText,setSearchText] = useState("")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      const restaurantCards = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []; // Fallback to empty array if undefined
      setListOfRestaurants(restaurantCards);
      setFilteredRestaurant(restaurantCards);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };


  return listOfRestaurants.length === 0 ? <Shimmer /> : (
    <div className="body">
      <div className="filter">
        <div className="search">
            <input type="text" className="search-box" value={searchText} onChange={(e)=>{
                setSearchText(e.target.value);
            }}/>
            <button className="" onClick={() => {
                const filteredRestaurant = listOfRestaurants.filter(
                    (res) => res?.card?.card?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
                );
                setFilteredRestaurant(filteredRestaurant);

            }} >Search</button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => parseFloat(res?.card?.card?.info?.avgRating) > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant, index) => {
          const resInfo = restaurant?.info;
          return (
            resInfo && ( // Only render RestaurantCard if the data exists
              <RestaurantCard key={resInfo?.id || index} resData={resInfo} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Body;
