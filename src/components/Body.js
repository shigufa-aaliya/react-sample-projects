import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("")

  const onlineStatus = useOnlineStatus()

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

  if (onlineStatus === false) return (<h1>Looks like you are offline!! Please check your internet.... </h1>);


  return listOfRestaurants.length === 0 ? <Shimmer /> : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => {
            setSearchText(e.target.value);
          }} />
          <button className="px-4 py-2 m-4 bg-green-100 rounded-lg" onClick={() => {
            const filteredRestaurant = listOfRestaurants.filter(
              (res) => res?.card?.card?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
            );
            setFilteredRestaurant(filteredRestaurant);

          }} >Search</button>
        </div>
       <div className="search m-4 p-4 flex items-center"> 
       <button
          className="px-4 py-2 bg-gray-100 rounded-lg"
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
      </div>
      <div className="flex flex-wrap">
        {
          filteredRestaurant.map((restaurant) => {
            const resInfo = restaurant?.info;
            return (
              resInfo && ( // Only render RestaurantCard if the data exists
                <Link
                  to={"/restaurant/" + resInfo?.id}
                  className="link-style"
                  key={resInfo?.id} // Added key prop here
                >
                  <RestaurantCard resData={resInfo} />
                </Link>
              )
            );
          })
        }
      </div>
    </div>
  );
};

export default Body;
