import { gql } from "@apollo/client";


export const GET_LAPS_CANVAS = gql`
  query GetLapsCanvas($canvas: CanvasInput!) {
    lapsByCanvas(canvas: $canvas) {
      id
      name
      duration
      geometry
      difficulty {
        level
      }
      images {
        imgUrl
      }
      createdAt
    }
  }
`;

export const GET_LAPS_CITY = gql`
  query GetLapsCity($city: String!) {
    lapsByCity(city: $city) {
      id
      name
      duration
      geometry
      difficulty {
        level
      }
      images {
        imgUrl
      }
      createdAt
    }
  }
`;