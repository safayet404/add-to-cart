import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";

const ProductLayout = ({layout, setLayout}) => {

  const handleLayoutChange = (layoutType) => {
    setLayout(layoutType);
  };
  return (
   
      <ul className="flex gap-5 justify-end">
        <li className="cursor-pointer">
          <BsFillGrid3X3GapFill
            className={` text-2xl ${layout === "grid" ? "text-[#525CEB]" : "text-[#212529]"}`}
            onClick={() => handleLayoutChange("grid")}
          />
        </li>
        <li className="cursor-pointer">
          <FaList
            className={` text-2xl ${layout === "list" ? "text-[#525CEB]" : "text-[#212529]"}`}
            onClick={() => handleLayoutChange("list")}
          />
        </li>
      </ul>

  );
};

export default ProductLayout;
