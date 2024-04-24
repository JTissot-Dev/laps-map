import { gql } from "@apollo/client";


export const GET_LAPS = gql`
  query GetLaps($canvas: CanvasInput!) {
    laps(canvas: $canvas) {
      id
      duration
      geometry
      difficulty
      createdAt
    }
  }
`;