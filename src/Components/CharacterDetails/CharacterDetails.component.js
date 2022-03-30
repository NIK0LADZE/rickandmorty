import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { SingleCharacterQuery } from "../../Helpers/gqlQueries";
import classes from "./CharacterDetails.module.css";

const CharacterDetails = () => {
  const { id } = useParams();
  const { Container } = classes;
  const { data, loading, error } = useQuery(SingleCharacterQuery, {
    variables: { id },
  });

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

    return (
      <div className={Container}>
        <Link to={"/"}>Back to home</Link>
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
