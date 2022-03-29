import { gql } from "@apollo/client";

export const CharactersQuery = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
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
