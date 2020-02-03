import { gql } from 'apollo-boost';

export const ALL_USERS = gql`
  query {
    randomUser {
      id
      userName
      avatar
      isFollowing
      posts {
        id
        files {
          id
          url
        }
        likeCount
        commentCount
      }
    }
    randomPost {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;
