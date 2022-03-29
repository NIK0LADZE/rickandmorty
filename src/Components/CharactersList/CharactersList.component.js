import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@apollo/client";
import { CharactersQuery } from "../../Helpers/gqlQueries";
import { Link, useLocation } from "react-router-dom";
import classes from "./CharactersList.module.css";

export default function CharactersList() {
  const location = useLocation();
  console.log(location);
  const page = 1;
  const { data, loading, error } = useQuery(CharactersQuery, {
    variables: { page },
  });

  const createData = (id, name, status) => {
    return { id, name, status };
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  if (data) {
    const {
      characters: { results },
    } = data;

    const rows = [];

    results.forEach((character) => {
      const { id, name, status } = character;
      rows.push(createData(id, name, status));
    });

    const { TableWrapper } = classes;

    return (
      <TableContainer component={Paper} className={TableWrapper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Status</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
