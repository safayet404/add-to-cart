import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import prev from "../../public/back.png";
import next from "../../public/back (1).png";
import Image from "next/image";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-4 py-2 mx-1 ${
            currentPage === i ? "bg-[#1C75CF] text-white" : ""
          } rounded-md`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        className=""
        onClick={() => handleClick(currentPage - 2)}
        disabled={currentPage === 1}
      >
        <Image src={prev} alt="prevbtn"/>
      </button>
      <button
        className="px-4 py-2  "
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>
      {renderPageNumbers()}
      <button
        className="px-4 py-2 "
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
      <button
        className=""
        onClick={() => handleClick(currentPage + 2)}
        disabled={currentPage === totalPages}
      >
        <Image src={next} alt="nextbtn"/>
      </button>
     
    </div>
  );
};

export default Pagination;
