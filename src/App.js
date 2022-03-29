import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout.component";
import CharactersList from "./Components/CharactersList/CharactersList.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CharactersList />} />
      </Route>
    </Routes>
  );
};

export default App;
