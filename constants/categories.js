import electrician from "../assets/assets/electrician.png";
import plumber from "../assets/assets/plumber.png";
import carpenter from "../assets/assets/carpenter.png";
import painter from "../assets/assets/paint-roller.png";
import chef from "../assets/assets/chef.png";
import mechanicCar from "../assets/assets/mechanicCar.png";
import truck from "../assets/assets/truck.png";
import ac from "../assets/assets/elec.png";
import washing from "../assets/assets/washing.png";
import welder from "../assets/assets/welder.png";
import gutter from "../assets/assets/cleaning.png";
import tile from "../assets/assets/tile.png";
import more from "../assets/assets/more.png";

const categories = [
  {
    image: electrician,
    label: "Electrician",
    value: "Electrician",
    subCategory: "All categories",
    backgroundColor: "rgb(237, 247, 237)",
  },
  {
    image: plumber,
    value: "Plumber",
    label: "Plumber",
    subCategory: "All Categories, General Services, Boring, Tank Cleaning",
    backgroundColor: "rgb(249, 220, 220)",
  },
  {
    image: carpenter,
    value: "Carpenter",
    label: "Carpenter",
    subCategory: "All categories",
    backgroundColor: "#fff4e5",
  },
  {
    image: painter,
    value: "Painter",
    label: "Painter",
    subCategory: "All categories",
    backgroundColor: "rgb(229, 246, 253)",
  },
  {
    image: mechanicCar,
    label: "Mechanic",
    value: "Mechanic",
    subCategory: "All Categories, Car Mechanic, Bike Mechanic, Cycle Mechanic",
    backgroundColor: "#e3e4ef",
  },
  {
    image: ac,
    label: "Electronics Repair",
    value: "Electronics Repair",
    subCategory: "All Categories, AC, Washing Machine, Fridge",
    backgroundColor: "#eff4f9",
  },
  {
    image: truck,
    label: "Room Shifting",
    value: "Room Shifting",
    subCategory:
      "All Categories, 407 Pickup, Chota Hathi, Thela, Battery Rickshaw",
    backgroundColor: "#fef9e8",
  },
  {
    image: welder,
    label: "Welder",
    value: "Welder",
    subCategory: "All categories",
    backgroundColor: "#cfd7e6",
  },
  {
    image: washing,
    label: "Laundry",
    value: "Laundry",
    subCategory: "All categories",
    backgroundColor: "#ede8f2",
  },
  {
    image: gutter,
    label: "Cleaning",
    value: "Cleaning",
    subCategory:
      "All Categories, House Cleaning, Bathroom Cleaning, Sofa/Carpet Cleaning, Parking/Stairs Cleaning, Shop Cleaning",
    backgroundColor: "#fef7e8",
  },
  {
    image: tile,
    label: "Mistiri",
    value: "Mistiri",
    subCategory:
      "All Categories, Tile Mistri, Marble Mistri, Raj Mistri, Glass Mistri",
    backgroundColor: "#edf9ed",
  },
  {
    image: more,
    label: "View More",
    value: "More",
    backgroundColor: "#673de72a",
  },
];

export default categories;
