import electrician from "../assets/assets/electrician.png";
import plumber from "../assets/assets/plumber.png";
import carpenter from "../assets/assets/carpenter.png";
import painter from "../assets/assets/paint-roller.png";
import chef from "../assets/assets/chef.png";
import mechanicCar from "../assets/assets/mechanicCar.png";
import truck from "../assets/assets/truck.png";
import ac from "../assets/assets/elec.png";
import newspaper from "../assets/assets/newspaper.png";
import welder from "../assets/assets/welder.png";
import cleaning from "../assets/assets/cleaning.png";
import gutter from "../assets/assets/gutter.png";
import tile from "../assets/assets/tile.png";
import makeup from "../assets/assets/makeup.png";
import more from "../assets/assets/more.png";
import pani from "../assets/assets/pani.png";
import kabadi from "../assets/assets/kabadi.png";
import glass from "../assets/assets/glass.png";

const categories = [
  {
    image: electrician,
    label: "Electrician",
    value: "Electrician",
    subCategory: "All Categories, General Services, Washing Machine, Microwave, Induction, Motor",
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
    subCategory: "All Categories, Car, Bike, Cycle",
    backgroundColor: "#e3e4ef",
  },
  {
    image: ac,
    label: "Electronics Repair",
    value: "Electronics Repair",
    subCategory:
      "All Categories, AC,TV, Washing Machine, Fridge, Microwave, Induction, Motor",
    backgroundColor: "#eff4f9",
  },
  {
    image: truck,
    label: "Room Shifting",
    value: "Room Shifting",
    subCategory:
      "All Categories, Bolaro Pickup, Tata Ace, Eicher Tempo, Thela, Battery Rickshaw",
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
    image: newspaper,
    label: "Interior Decorator",
    value: "Interior Decorator",
    subCategory: "All Categories, Modular Kitchen, Furniture, False Ceiling, Floor",
    backgroundColor: "#ede8f2",
  },
  {
    image: cleaning,
    label: "Cleaner",
    value: "Cleaner",
    subCategory:
      "All Categories, Malba Pickup, House, Bathroom, Sofa/Carpet, Parking/Stairs, Shop",
    backgroundColor: "#fef7e8",
  },

  {
    image: tile,
    label: "Mistiri",
    value: "Mistiri",
    subCategory:
      "All Categories, Tile Mistri, Marble Mistri, Raj Mistri",
    backgroundColor: "#edf9ed",
  },
  {
    image: gutter,
    label: "Gutter Cleaner",
    value: "Gutter Cleaner",
    subCategory: "All categories",
    backgroundColor: "#fef7e8",
  },

  {
    image: makeup,
    label: "Women's Parlour",
    value: "Women's Parlour",
    subCategory: "All Categories, Hair Cutting, Facial, Massage, Mehandi",
    backgroundColor: "#FFE9EC",
  },
  {
    image: pani,
    label: "Pani Wala",
    value: "Pani Wala",
    subCategory: "All Categories",
    backgroundColor: "#ADD8E61a",
  },
  {
    image: kabadi,
    label: "Kabadi Wala",
    value: "Kabadi Wala",
    subCategory: "All Categories",
    backgroundColor: "#A52A2A1a",
  },
  {
    image: glass,
    label: "Glass Work",
    value: "Glass Work",
    subCategory: "All Categories",
    backgroundColor: "#673de71a",
  },
];

export default categories;
