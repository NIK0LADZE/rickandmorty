import classes from "./Header.module.css";

const Header = () => {
  const { List } = classes;

  return (
    <header>
      <ul className={List}>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
      </ul>
    </header>
  );
};

export default Header;
