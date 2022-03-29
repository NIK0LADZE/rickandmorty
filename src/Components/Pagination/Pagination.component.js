import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { InfoQuery } from "../../Helpers/gqlQueries";

const PaginationComponent = () => {
  const { data, loading, error } = useQuery(InfoQuery);
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  if (data) {
    const pages = [];
    const currentPage = Number(query.get("page")) || 1;

    const {
      characters: {
        info: { pages: totalPages },
      },
    } = data;

    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    const pagesList = pages.map((page) => {
      if (page >= currentPage - 2 && page <= currentPage + 2)
        return (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <Link to={`/?page=${page}`} className="page-link">
              {page}
            </Link>
          </li>
        );
      return null;
    });

    return (
      <nav>
        <ul className="pagination mt-4 justify-content-center">
          <li className={`page-item ${currentPage - 1 < 1 ? "disabled" : ""}`}>
            <Link to={`/`} className="page-link">
              &laquo;
            </Link>
          </li>
          <li className={`page-item ${currentPage - 1 < 1 ? "disabled" : ""}`}>
            <Link to={`/?page=${currentPage - 1}`} className="page-link">
              Previous
            </Link>
          </li>
          {pagesList}
          <li
            className={`page-item ${
              currentPage + 1 > totalPages ? "disabled" : ""
            }`}
          >
            <Link to={`/?page=${currentPage + 1}`} className="page-link">
              Next
            </Link>
          </li>
          <li
            className={`page-item ${
              currentPage + 1 > totalPages ? "disabled" : ""
            }`}
          >
            <Link to={`/?page=${totalPages}`} className="page-link">
              &raquo;
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default PaginationComponent;
