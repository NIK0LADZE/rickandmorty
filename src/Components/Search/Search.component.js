import { useLazyQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ClickOutside } from "../ClickOutside/ClickOutside.component";
import { CharactersQuery } from "../../Helpers/gqlQueries";
import classes from "./Search.module.css";

export default function Search() {
  const [isBlur, setIsBlur] = useState(true);
  const { searchInput, searchResultList, errorMessage, clearIcon, Wrapper } =
    classes;
  let searchInputRef = useRef();
  let typingTimer;

  const [searchCharacter, { data, loading, called, error }] = useLazyQuery(
    CharactersQuery,
    {
      variables: {
        filter: { name: searchInputRef.current?.value },
      },
    }
  );

  const clearSearchField = () => {
    searchInputRef.current.focus();
    searchInputRef.current.value = "";
  };

  const showOrHideResults = () => {
    if (!isBlur) {
      setIsBlur(true);
    } else {
      setIsBlur(false);
    }
  };

  const characterClickHandler = (name) => {
    searchInputRef.current.value = name;
    setIsBlur(true);
  };

  const handleKeyUp = () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      searchCharacter();
    }, 500);
  };

  const searchResults = () => {
    if (data && !error) {
      const {
        characters: { results },
      } = data;

      return results.map((character) => {
        const { id, name } = character;
        return (
          <li key={id} onClick={() => characterClickHandler(name)}>
            <Link to={`character/${id}`}>{name}</Link>
          </li>
        );
      });
    }

    if (error) {
      return <li className={errorMessage}>Character not found</li>;
    }

    return null;
  };

  return (
    <ClickOutside show={!isBlur} clickHandler={showOrHideResults}>
      <div className={Wrapper}>
        <input
          className={`form-control ${searchInput}`}
          placeholder="Type to search..."
          onKeyUp={handleKeyUp}
          onFocus={showOrHideResults}
          ref={searchInputRef}
        />
        {searchInputRef.current?.value.length > 0 && (
          <span className={clearIcon} onClick={clearSearchField}>
            &times;
          </span>
        )}
        <ul
          className={searchResultList}
          style={{
            display:
              !isBlur &&
              called &&
              !loading &&
              searchInputRef.current?.value.length > 0
                ? "block"
                : "none",
          }}
        >
          {searchResults()}
        </ul>
      </div>
    </ClickOutside>
  );
}
