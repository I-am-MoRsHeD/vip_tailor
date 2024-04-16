import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import timg from "../../../assets/Group94.png";
const EmployeeHome = () => {
  return (
    <div className="">
      <div className="2xl:h-[80vh] lg:h-[85vh] md:h-[82vh] h-[80vh] bg-white mx-4 lg:mx-0 lg:ml-10 rounded-md">
        <div className="flex flex-col-reverse items-center justify-center h-full lg:flex-col">
          <div className="flex justify-center items-center p-10">
            <SectionTitle
              title="Welcome to professional dashboard"
              descrition="Insights, management tools and ad creation - all in one place"
            />
          </div>
          {/* card container */}
          <div className="flex justify-center items-center">
            <img src={timg} className="w-2/4 pt-2 pl-7" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
