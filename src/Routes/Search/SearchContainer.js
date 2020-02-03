import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchPresenter from './SearchPresenter';
import { useQuery } from '@apollo/react-hooks';
import { SEARCH } from './SearchQueries';

export default withRouter(({ location: { search } }) => {
  const term = search.split('=')[1];
  //쿼리가 무조건 실행되는데 skip을 걸면 안함
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });

  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});
