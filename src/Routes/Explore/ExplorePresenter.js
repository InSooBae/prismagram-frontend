import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
  min-height: 70vh;
`;

const UserCards = styled.div``;

const PostsCards = styled.div``;

const Text = styled(FatText)`
  color: ${props => props.theme.darkGreyColor};
`;

const Section = styled.div`
  margin-top: 15px;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 45px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  button {
    margin-top: 48px;
  }
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ data, loading }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.randomUser && data.randomPost) {
    return (
      <Wrapper>
        <Helmet>
          <title> Explore | Prismagram</title>
        </Helmet>
        <UserCards>
          <Text text="팔로우 할 만한 계정 만들기" />
          <Section>
            {data.randomUser.length === 0 ? (
              <FatText text="No Users Found" />
            ) : (
              data.randomUser.map(user => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  url={user.avatar}
                  userName={user.userName}
                  isFollowing={user.isFollowing}
                />
              ))
            )}
          </Section>
        </UserCards>
        <PostsCards>
          <Text text="탐색 탭" />
          <PostSection>
            {data.randomPost.length === 0 ? (
              <FatText text="No Posts Found" />
            ) : (
              data.randomPost.map(post => (
                <SquarePost
                  key={post.id}
                  file={post.files[0]}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                />
              ))
            )}
          </PostSection>
        </PostsCards>
      </Wrapper>
    );
  }
};
