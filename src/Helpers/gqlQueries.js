import { gql } from "@apollo/client";

export const CharactersQuery = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
      }
    }
  }
`;
