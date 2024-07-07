import "./Home.scss";
import find from "./../../assets/imgs/find.png";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

const Home = () => {
  const navigate = useNavigate();

  /**
   * Handles the submission of a search term and navigates to the movies page with the search query.
   *
   * @param {string} term - The search term to be used as a query parameter.
   * @returns {void} This function does not return anything.
   */
  const handleSearchSubmit = (term) => {
    navigate(`/movies?query=${term}`);
  };

  return (
    <div className="home">
      <Navbar></Navbar>

      <div className="home__img">
        <img src={find} alt="find" />
      </div>

      <SearchBar onSearchSubmit={handleSearchSubmit} />
    </div>
  );
};

export default Home;
