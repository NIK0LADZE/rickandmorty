import reactDom from "react-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SingleCharacterQuery } from "../../Helpers/gqlQueries";
import {
  likeCharacterDispatcher,
  unlikeCharacterDispatcher,
} from "../../Store/LikedCharacters/LikedCharacters.dispatcher";
import Modal from "../Modal/Modal.component";
import classes from "./CharacterDetails.module.css";

const CharacterDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { Container } = classes;
  const { data, loading, error } = useQuery(SingleCharacterQuery, {
    variables: { id },
  });

  const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.LoginReducer.currentUser);
  const dispatch = useDispatch();

  const likedCharacters = useSelector(
    (state) => state.LikedCharactersReducer.likedCharacters
  );

  const userLikedCharacters = likedCharacters.find(
    (user) => user.name === currentUser
  )?.likedCharacters;

  const isLiked = userLikedCharacters?.find(
    (characterData) => characterData.id === id
  );

  const handleAction = (id, name, status) => {
    const likedCharacter = userLikedCharacters?.find(
      (characterData) => characterData.id === id
    );
    const characterData = { id, name, status };

    if (!likedCharacter) {
      if (!isLoggedIn) {
        setIsModalOpen(true);
      } else {
        dispatch(
          likeCharacterDispatcher(currentUser, likedCharacters, characterData)
        );
      }
    } else {
      dispatch(unlikeCharacterDispatcher(currentUser, likedCharacters, id));
    }
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  if (data) {
    const {
      character: {
        name,
        species,
        gender,
        status,
        created,
        location: { name: location },
        episode: episodes,
      },
    } = data;
    const { length } = episodes;
    const formattedCreatedDate = new Date(created);
    const portalTarget = document.getElementById("overlay");

    return (
      <div className={Container}>
        {isModalOpen &&
          reactDom.createPortal(
            <Modal setIsModalOpen={setIsModalOpen} />,
            portalTarget
          )}
        <div className="d-flex justify-content-between">
          <p onClick={() => handleAction(id, name, status)}>
            {!isLiked ? "Like" : "Unlike"}
          </p>
          <Link to={"/"}>Back to home</Link>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>Species</th>
              <td>{species}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{gender}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{location}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{status}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{formattedCreatedDate.toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
        <h6 className="text-end">Total Episodes: {length}</h6>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Episode Name</th>
              <th>Episode</th>
              <th>Air Date</th>
            </tr>
            {episodes.map((element) => {
              const { id, name, episode, air_date } = element;
              const formattedAirDate = new Date(air_date);

              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{episode}</td>
                  <td>{formattedAirDate.toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default CharacterDetails;
