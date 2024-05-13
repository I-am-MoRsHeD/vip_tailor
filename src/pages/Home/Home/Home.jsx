import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import QuoteBanner from "../QuoteBanner/QuoteBanner";
import Featured from "../FeaturedProducts/Featured";
import useAuth from "../../../hooks/useAuth";
import SignIn from "../Login/SignIn";
import useUser from "../../../hooks/useUser";
import AdminDashboard from "../../Dashboard/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "../../Dashboard-Employee/EmployeeDashbaord/EmployeeDashbaord";
import Notice from "../NoticeBoard/Notice";
import Navbar2 from "../../../shared/Navbar2/Navbar2";
import useUserRoll from "../../../hooks/useUserRoll";
import useAdmin from "../../../hooks/useAdmin";

const Home = () => {
  const { isAdmin } = useAdmin();
  console.log(isAdmin);
  // const [loggedUser, setLoggedUser] = useState();
  // console.log(loggedUser?.role);
  // const [users] = useUser();
  // console.log(users);
  // const { user, setLoading, loading } = useAuth();

  // useEffect(() => {
  //   if (user && users) {
  //     const filteredUser = users.find((us) => us.email === user.email);
  //     setLoggedUser(filteredUser);
  //   }
  // }, [users, user]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* {user ? (
        loggedUser ? (
          <div key={loggedUser._id}>
            {loggedUser.role === "employee" ? (
              <div>
                <EmployeeDashboard
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                  closeSideMenu={closeSideMenu}
                />
              </div>
            ) : loggedUser.role === "admin" ? (
              <div>
                <AdminDashboard
                  isSideMenuOpen={isSideMenuOpen}
                  toggleSideMenu={toggleSideMenu}
                  closeSideMenu={closeSideMenu}
                />
              </div>
            ) : (
              <>
                <Banner />
                <Featured />
                <Notice />
                <QuoteBanner />
              </>
            )}
          </div>
        ) : (
          <>
            <Banner />
            <Featured />
            <Notice />
            <QuoteBanner />
          </>
        )
      ) : (
        <>
          <Banner />
          <Featured />
          <Notice />
          <QuoteBanner />
        </>
      )} */}
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
