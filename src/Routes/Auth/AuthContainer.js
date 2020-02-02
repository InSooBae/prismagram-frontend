//Auth에 관련된 모든 state랑 query,data 같은것들을 Container에다가 둠
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from './AuthQueries';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';

export default () => {
  const [action, setAction] = useState('logIn');
  const userName = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const secret = useInput('');
  const [requestSecretMutation] = useMutation(LOG_IN, {
    //useInput한 변수들은 value까지 접근해줘야 값나옴
    variables: { email: email.value }
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      userName: userName.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  //<Mutation onComplete={} onError={} 요것들은 이 컴포넌트에 포함되있는 얘들
  //아래 try는 onComplete기능 catch는 onError기능이랑 같게됨
  const onSubmit = async e => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email.value !== '') {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You don't have an Account yet, Please create one");
            setTimeout(() => setAction('signUp'), 3000);
          } else {
            toast.success('Check your inbox for Your Login Secret!');
            setAction('confirm');
          }
        } catch {
          toast.error("Can't request secret, Try Agian!");
        }
      } else {
        toast.error('Email is required');
      }
    } else if (action === 'signUp') {
      if (
        email.value !== '' &&
        userName.value !== '' &&
        firstName.value !== '' &&
        lastName.value !== ''
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success('Account created! Log In now');
            setTimeout(() => setAction('logIn'), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('All field are required');
      }
    } else if (action === 'confirm') {
      if (secret.value !== '') {
        try {
          //confirmSecret 호출 후에 token이생겨 localLoginMutation에 variables로 token 전달해줌 (useMutation은 function호출,mutation만들때 variables넘길수있음)
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (token !== '' && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Can't confirm Secret, Please Check Again");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      lastName={lastName}
      firstName={firstName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
