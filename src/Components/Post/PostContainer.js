import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import PostPresenter from './PostPresenter';
import useInput from '../../Hooks/useInput';

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  //1개씩 늘어나고 없어지는거라 state에 임시적으로 담고 리프레쉬되면 실제서버로 바뀌고 아님 서버를 통해서가아닌 시각적인 효과로 바로 추가 및 삭제
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);

  const comment = useInput('');
  //Header에서 이미 실행됐던 코드라 API로 한번 보내서 더이상 가지않음
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation, { loading: mutationLoading }] = useMutation(
    ADD_COMMENT,
    {
      variables: { postId: id, text: comment.value }
    }
  );

  useEffect(() => {
    const totalFiles = files.length;
    let timer = null;
    if (currentItem === totalFiles - 1) {
      timer = setTimeout(() => setCurrentItem(0), 3000);
    } else {
      timer = setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
    return () => clearTimeout(timer);
  }, [currentItem, files]);

  const toggleLike = async () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  //Mutation 기다리고 UI에 응답
  // const toggleLike = async () => {
  //   try {
  //     await toggleLikeMutation();
  //     if (isLikeds === true) {
  //       setIsLiked(false);
  //     } else {
  //       setIsLiked(true);
  //     }
  //   } catch {
  //     toast.errror("Can't register Like!");
  //   }
  // };

  const onKeyPress = async event => {
    const { which } = event;

    if (which === 13) {
      event.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue('');
      } catch {
        toast.error("Can't Send Comment!");
      }
    }
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      mutationLoading={mutationLoading}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
