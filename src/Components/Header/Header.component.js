import Search from "../Search/Search.component";
import classes from "./Header.module.css";

const Header = () => {
  const { Container } = classes;

  return (
    <header>
      <div className={Container}>
        <Search />
      </div>
    </header>
  );
};

export default Header;
