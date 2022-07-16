import { useEffect } from "react";


function Logout() {
  useEffect(() => {
    // set < loggedIn > in local stroage
    console.log("Logging out");
    
  }, []);
  console.log("Logging out ...");
  localStorage.setItem("isLoggedIn", "false");
  return (
          <div className="">
              <h1 id='title'>  You have been logged out </h1>
          </div>
        );
}

export default Logout;
