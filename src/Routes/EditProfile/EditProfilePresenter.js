import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import useInput from '../../Hooks/useInput';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const PhotoLink = styled(Link)`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Text = styled.div``;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 600px;
`;

const Form = styled(Box)`
  padding: 30px 60px;
  form {
    width: 100%;
    div {
      display: inline-block;
      width: 70px;
      font-size: 12px;
      font-weight: 600;
      margin-right: 10px;
      text-align: right;
    }
    input {
      width: 83%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  data,
  loading,
  setUserName,
  setEmail,
  setFirstName,
  setLastName,
  setBio,
  onSubmit,
  action
}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const { seeUser } = data;
    const userName = useInput(`${seeUser.userName}`);
    const email = useInput(`${seeUser.email}`);
    const firstName = useInput(`${seeUser.firstName}`);
    const lastName = useInput(`${seeUser.lastName}`);
    const bio = useInput(`${seeUser.bio}`);
    setUserName(`${userName.value}`);
    setEmail(`${email.value}`);
    setFirstName(`${firstName.value}`);
    setLastName(`${lastName.value}`);
    setBio(`${bio.value}`);

    return (
      <Wrapper>
        <Helmet>
          <title>EditFrofile | Prismagram</title>
        </Helmet>
        {action === 'view' && (
          <Form>
            <Header>
              <Avatar size="md" url={seeUser.avatar} />
              <UserColumn>
                <FatText text={seeUser.userName} />
                <PhotoLink to="/#">
                  <FatText text="프로필 사진 바꾸기" />
                </PhotoLink>
              </UserColumn>
            </Header>
            <form onSubmit={onSubmit}>
              <Text>userName</Text>
              <Input placeholder={'userName'} {...userName} />
              <Text>email</Text>
              <Input placeholder={'email'} {...email} type="email" />
              <Text>firstName</Text>
              <Input placeholder={'firstName'} {...firstName} />
              <Text>lastName</Text>
              <Input placeholder={'lastName'} {...lastName} />
              <Text>bio</Text>
              <Input placeholder={'bio'} {...bio} />
              <Button text={'Edit Profile'} />
            </form>
          </Form>
        )}
        {action === 'profile' && <Redirect to="/" />}
      </Wrapper>
    );
  }
};
