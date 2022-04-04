import { gql } from "@apollo/client";

export const CharactersQuery = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
      }
      results {
        id
        name
        status
      }
    }
  }
`;

export const SingleCharacterQuery = gql`
  query GetSingleCharacter($id: ID!) {
    character(id: $id) {
      name
      image
      species
      gender
      location {
        name
      }
      episode {
        id
        name
        episode
        air_date
      }
      status
      created
    }
  }
`;

export const InfoQuery = gql`
  query GetInfo {
    characters {
      info {
        pages
      }
    }
  }
`;
