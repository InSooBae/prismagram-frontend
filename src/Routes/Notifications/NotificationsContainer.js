import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import NotificationsPresenter from './NotificationsPresenter';

//sharedQuries에 있는데 나중에 refactoring 해야할듯
const ME = gql`
  query {
    me {
      followers {
        id
        userName
        avatar
        isFollowing
      }
    }
  }
`;

export default () => {
  const { data, loading } = useQuery(ME);

  return <NotificationsPresenter data={data} loading={loading} />;
};
