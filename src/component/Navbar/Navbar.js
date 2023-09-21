import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="nav">
      <span className="name-1">SynaxMart</span>
      
      <Link to="/" className=" name">Home</Link>
      <Link to="./" className="name">About</Link>
      <Link to="./" className="name">Contact</Link>
      <input type="search" className="search" placeholder="search"></input>
    </div>
  );
}

// export default function Navbar({}){

//     return (
//         <div className="nav">
//         < >React</> 
//         <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/contact">Contact</Link>
//       </div>
//     )
   
// }