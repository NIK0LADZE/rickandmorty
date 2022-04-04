import * as React from "react";
import reactDom from "react-dom";
import { useQuery } from "@apollo/client";
import { CharactersQuery } from "../../Helpers/gqlQueries";
import { Link, useLocation } from "react-router-dom";
import Modal from "../Modal/Modal.component";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PaginationComponent from "../Pagination/Pagination.component";
import { useDispatch, useSelector } from "react-redux";
import {
  likeCharacterDispatcher,
  unlikeCharacterDispatcher,
} from "../../Store/LikedCharacters/LikedCharacters.dispatcher";
import classes from "./CharactersList.module.css";

export default function CharactersList() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { search } = useLocation();
  const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.LoginReducer.currentUser);
  const dispatch = useDispatch();
  const query = new URLSearchParams(search);
  const page = Number(query.get("page")) || 1;

  const likedCharacters = useSelector(
    (state) => state.LikedCharactersReducer.likedCharacters
  );

  const userLikedCharacters = likedCharacters.find(
    (user) => user.name === currentUser
  )?.likedCharacters;

  const { data, loading, error } = useQuery(CharactersQuery, {
    variables: { page },
  });

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

  const renderTable = (rows, totalCharCount) => {
    const { Action } = classes;

    return (
      <React.Fragment>
        <div
          className={`${
            isLoggedIn ? "d-flex justify-content-between" : "d-block"
          }`}
        >
          {isLoggedIn && (
            <h6>
              <Link to={"/my-liked-characters"}>List of liked characters</Link>
            </h6>
          )}
          <h6 className="text-end mb-3">Total Characters: {totalCharCount}</h6>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`character/${row.id}`}>{row.name}</Link>
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell
                    align="right"
                    className={Action}
                    onClick={() => handleAction(row.id, row.name, row.status)}
                  >
                    {!row.isLiked ? "Like" : "Unlike"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  };

  const createData = (id, name, status, isLiked) => {
    return { id, name, status, isLiked };
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  if (data) {
    const portalTarget = document.getElementById("overlay");
    const { ContentWrapper } = classes;
    const {
      characters: {
        results,
        info: { count },
      },
    } = data;

    const rows = [];

    results.forEach((character) => {
      const { id, name, status } = character;
      const isLiked = userLikedCharacters?.find(
        (characterData) => characterData.id === id
      );
      rows.push(createData(id, name, status, isLiked));
    });

    return (
      <>
        {isModalOpen &&
          reactDom.createPortal(
            <Modal setIsModalOpen={setIsModalOpen} />,
            portalTarget
          )}
        <div className={ContentWrapper}>
          {renderTable(rows, count)}
          <PaginationComponent />
        </div>
      </>
    );
  }
}
