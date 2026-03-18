import {
  FaCar,
  FaHome,
  FaTv,
  FaTshirt,
  FaLaptop,
} from "react-icons/fa";

const categories = [
  { name: "Vehicles", icon: FaCar },
  { name: "House", icon: FaHome },
  { name: "Electronics", icon: FaTv },
  { name: "Fashion", icon: FaTshirt },
  { name: "Office", icon: FaLaptop },
];

export default function CategoryList() {
  return (
    <div className="flex gap-5 mt-10 justify-center">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="flex flex-col w-40 h-40 border items-center justify-center rounded"
        >
          <cat.icon className="text-2xl mb-2" />
          <span>{cat.name}</span>
        </div>
      ))}
    </div>
  );
}