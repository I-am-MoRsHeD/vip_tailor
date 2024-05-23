import React, { useState, useCallback } from "react";
import Banner from "../Banner/Banner";
import QuoteBanner from "../QuoteBanner/QuoteBanner";
import Featured from "../FeaturedProducts/Featured";
import AdminDashboard from "../../Dashboard/AdminDashboard/AdminDashboard";
import Notice from "../NoticeBoard/Notice";
import useAdmin from "../../../hooks/useAdmin";

const Home = () => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = useCallback(() => {
    setIsSideMenuOpen((prevState) => !prevState);
  }, []);

  const closeSideMenu = useCallback(() => {
    setIsSideMenuOpen(false);
  }, []);

  return (
    <div>
      {isAdmin ? (
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
