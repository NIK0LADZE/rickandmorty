import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { unlikeCharacterDispatcher } from "../../Store/LikedCharacters/LikedCharacters.dispatcher";
import classes from "./LikedCharactersList.module.css";

const LikedCharactersList = () => {
  const { Container, Action } = classes;

  const currentUser = useSelector((state) => state.LoginReducer.currentUser);
  const dispatch = useDispatch();

  const likedCharacters = useSelector(
    (state) => state.LikedCharactersReducer.likedCharacters
  );

  const userLikedCharacters = likedCharacters.find(
    (user) => user.name === currentUser
  )?.likedCharacters;

  const unlikeCharacter = (id) => {
    dispatch(unlikeCharacterDispatcher(currentUser, likedCharacters, id));
  };

  return (
    <div className={Container}>
      <Link to={"/"}>Back to home</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userLikedCharacters?.map((character) => {
            const { id, name, status } = character;

            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{status}</td>
                <td className={Action} onClick={() => unlikeCharacter(id)}>
                  Unlike
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LikedCharactersList;
