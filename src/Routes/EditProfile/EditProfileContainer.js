import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import EditProfilePresenter from './EditProfilePresenter';
import { GET_USER, EDIT_PROFILE } from './EditProfileQueries';

export default withRouter(
  ({
    match: {
      params: { editUser }
    }
  }) => {
    const [action, setAction] = useState('view');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const { data, loading } = useQuery(GET_USER, {
      variables: { userName: editUser }
    });
    const [editUserMutation] = useMutation(EDIT_PROFILE, {
      variables: {
        userName,
        email,
        firstName,
        lastName,
        bio
      }
    });

    const onSubmit = async e => {
      e.preventDefault();
      if (userName !== '' && email !== '') {
        try {
          const {
            data: { editUser }
          } = await editUserMutation();
          if (!editUser) {
            toast.error("Can't Edit User");
          } else {
            toast.success('Edit User');
            setTimeout(() => setAction('profile'), 1000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('userName, email field are required');
      }
    };

    return (
      <EditProfilePresenter
        data={data}
        loading={loading}
        setUserName={setUserName}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setBio={setBio}
        onSubmit={onSubmit}
        action={action}
      />
    );
  }
);
