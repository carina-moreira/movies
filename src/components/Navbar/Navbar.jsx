import "./Navbar.scss";
import avatar from "./../../assets/imgs/avatar.png";
import bell from "./../../assets/imgs/icon_notification.svg";
import arrowDown from "./../../assets/imgs/icon_arrow.svg";
import SearchBar from "./../SearchBar/SearchBar.jsx";
import { useLocation } from "react-router-dom";

const Navbar = ({ onSearchSubmit }) => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="navbar__brand">
        <span className="navbar__brand--concealed">CONCEALED</span>
        <span className="navbar__brand--films">FILMS</span>
      </div>
      <div className="navbar__actions">
        {location.pathname === "/movies" && (
          <SearchBar onSearchSubmit={onSearchSubmit} />
        )}

        <div className="navbar__actions__bell">
          <img src={bell} alt="bell" className="icon" />
        </div>
        <div className="navbar__actions__profile">
          <img
            src={avatar}
            alt="profile"
            className="icon navbar__actions__profile--img"
          />
          <img
            src={arrowDown}
            alt="arrow-down"
            className="navbar__actions__profile--arrow"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
