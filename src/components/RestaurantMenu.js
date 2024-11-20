
import { useEffect,useState } from "react";
import { MENU_URL } from "../utils/constant";
import Shimmer from "./Shimmer";
import {useParams} from "react-router-dom"

const RestaurantMenu = () =>{

    const {resId} = useParams();

    const [resInfo,setResInfo] = useState(null)

    useEffect(() =>{
        fetchMenu();
    },[])


    const fetchMenu = async () => {
      const data = await fetch(MENU_URL + resId);

      const json = await data.json();

      setResInfo(json.data);
    };

    if (resInfo === null) return <Shimmer />;


    const { name, cuisines, costForTwoMessage } =
      resInfo?.cards[2]?.card?.card?.info;

    let { itemCards } =
      resInfo?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card.card;


    return (
      <div className="menu">
        <h1>{name}</h1>
        <p>
          {cuisines.join(",")} - {costForTwoMessage}{" "}
        </p>

        <h2>Menu</h2>
        <ul>
          {itemCards.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - {" "}
              {item.card.info.price/100 || item.card.info.defaultPrice/100}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default RestaurantMenu;