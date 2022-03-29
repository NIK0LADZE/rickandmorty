import * as React from "react";
import { useQuery } from "@apollo/client";
import { CharactersQuery } from "../../Helpers/gqlQueries";
import { Link, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./CharactersList.module.css";
import PaginationComponent from "../Pagination/Pagination.component";

export default function CharactersList() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const page = Number(query.get("page")) || 1;
  const { data, loading, error } = useQuery(CharactersQuery, {
    variables: { page },
  });

  const renderTable = (rows, totalCharCount) => {
    return (
      <React.Fragment>
        <h6 className="text-end mb-3">Total Characters: {totalCharCount}</h6>
        <TableContainer component={Paper}>
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
      </React.Fragment>
    );
  };

  const createData = (id, name, status) => {
    return { id, name, status };
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  if (data) {
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
      rows.push(createData(id, name, status));
    });

    return (
      <div className={ContentWrapper}>
        {renderTable(rows, count)}
        <PaginationComponent />
      </div>
    );
  }
}
