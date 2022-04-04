import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout.component";
import CharactersList from "./Components/CharactersList/CharactersList.component";
import CharacterDetails from "./Components/CharacterDetails/CharacterDetails.component";
import LikedCharactersList from "./Components/LikedCharactersList/LikedCharactersList.component";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route
          path="/my-liked-characters"
          element={isLoggedIn ? <LikedCharactersList /> : <Navigate to={"/"} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
