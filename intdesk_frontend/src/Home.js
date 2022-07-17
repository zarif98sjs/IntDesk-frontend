
import logo from './images/logo5.png'; // Tell webpack this JS file uses this image
import Navbar from "./navbar";

export default function Home() {
  return (
    <div>
    <Navbar />
    <p align="center">
    <img src={logo} alt="IntDesk" />
    </p>
    
    </div>
  );
}

