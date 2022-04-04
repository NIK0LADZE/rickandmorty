import { UPDATE_LIKED_CHARACTERS } from "./LikedCharacters.action";

const getInitialLikedCharactersState = () => ({
  likedCharacters: localStorage.getItem("liked_characters")
    ? JSON.parse(localStorage.getItem("liked_characters"))
    : [],
});

const updateLikedCharactersState = (data) => {
  return { likedCharacters: data };
};

export const LikedCharactersReducer = (
  state = getInitialLikedCharactersState(),
  action
) => {
  const { type, data } = action;

  switch (type) {
    case UPDATE_LIKED_CHARACTERS:
      return updateLikedCharactersState(data);
    default:
      return state;
  }
};
