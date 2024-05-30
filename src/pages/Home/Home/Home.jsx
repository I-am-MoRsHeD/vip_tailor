// import React, { useState, useCallback } from "react";
// import Banner from "../Banner/Banner";
// import QuoteBanner from "../QuoteBanner/QuoteBanner";
// import Featured from "../FeaturedProducts/Featured";
// import AdminDashboard from "../../Dashboard/AdminDashboard/AdminDashboard";
// import Notice from "../NoticeBoard/Notice";
// import useAdmin from "../../../hooks/useAdmin";

// const Home = () => {
//   const { isAdmin, isAdminLoading } = useAdmin();
//   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

//   const toggleSideMenu = useCallback(() => {
//     setIsSideMenuOpen((prevState) => !prevState);
//   }, []);

//   const closeSideMenu = useCallback(() => {
//     setIsSideMenuOpen(false);
//   }, []);

//   return (
//     <div>
//       {isAdmin ? (
//         <AdminDashboard
//           isSideMenuOpen={isSideMenuOpen}
//           toggleSideMenu={toggleSideMenu}
//           closeSideMenu={closeSideMenu}
//         />
//       ) : (
//         <>
//           <Banner />
//           <Featured />
//           <Notice />
//           <QuoteBanner />
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useCallback, useEffect } from "react";
import Banner from "../Banner/Banner";
import Featured from "../FeaturedProducts/Featured";
import AdminDashboard from "../../Dashboard/AdminDashboard/AdminDashboard";
import Notice from "../NoticeBoard/Notice";
import QuoteBanner from "../QuoteBanner/QuoteBanner";
import useAdmin from "../../../hooks/useAdmin";
import Loader from "../../../components/loader/Loader";

const Home = () => {
  const { isAdmin } = useAdmin();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSideMenu = useCallback(() => {
    setIsSideMenuOpen((prevState) => !prevState);
  }, []);

  const closeSideMenu = useCallback(() => {
    setIsSideMenuOpen(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        </>
      ) : error ? (
        <div>Error loading data: {error.message}</div>
      ) : isAdmin ? (
        <AdminDashboard
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
          closeSideMenu={closeSideMenu}
        />
      ) : (
        <>
          <Banner />
          <Featured />
          <Notice />
          <QuoteBanner />
        </>
      )}
    </div>
  );
};

export default Home;
