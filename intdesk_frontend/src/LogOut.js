import { useEffect } from "react";
import Navbar from "./Navbar/Navbar";

function Logout() {
  useEffect(() => {
    // set < loggedIn > in local stroage
    console.log("Logging out");
  }, []);
  console.log("Logging out ...");
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("user", null);
  return (
    <div className="">
      <Navbar />
      <h1 id="title"> You have been logged out </h1>
    </div>
  );
}

export default Logout;
