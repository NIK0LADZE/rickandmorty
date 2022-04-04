import { updateLikedCharactersAction } from "./LikedCharacters.action";

export const likeCharacterDispatcher =
  (currentUser, likedCharacters, characterData) => (dispatch) => {
    const userDataIndex = likedCharacters.findIndex(
      (user) => user.name === currentUser
    );
    const userData = userDataIndex < 0 ? null : likedCharacters[userDataIndex];
    let updatedLikedCharacters, updatedUserData;

    if (!userData) {
      updatedUserData = { name: currentUser, likedCharacters: [characterData] };
      updatedLikedCharacters = [...likedCharacters, updatedUserData];
    } else {
      updatedUserData = {
        name: currentUser,
        likedCharacters: [...userData.likedCharacters, characterData],
      };

      likedCharacters[userDataIndex] = updatedUserData;
      updatedLikedCharacters = [...likedCharacters];
    }

    localStorage.setItem(
      "liked_characters",
      JSON.stringify(updatedLikedCharacters)
    );
    dispatch(updateLikedCharactersAction(updatedLikedCharacters));
  };

export const unlikeCharacterDispatcher =
  (currentUser, likedCharacters, id) => (dispatch) => {
    const userDataIndex = likedCharacters.findIndex(
      (user) => user.name === currentUser
    );
    const userData = likedCharacters[userDataIndex];
    let updatedLikedCharacters, updatedUserLikedCharacters;

    updatedUserLikedCharacters = userData.likedCharacters.filter(
      (characterData) => characterData.id !== id
    );

    likedCharacters[userDataIndex] = {
      name: currentUser,
      likedCharacters: updatedUserLikedCharacters,
    };

    updatedLikedCharacters = [...likedCharacters];
    localStorage.setItem(
      "liked_characters",
      JSON.stringify(updatedLikedCharacters)
    );
    dispatch(updateLikedCharactersAction(updatedLikedCharacters));
  };
