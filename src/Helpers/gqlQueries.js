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

export const InfoQuery = gql`
  query GetInfo {
    characters {
      info {
        pages
      }
    }
  }
`;
