import React, { useState, useEffect } from 'react';

/* Style */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Line } from '../page/Login';
/* Reducer */
import { useSelector, useDispatch } from 'react-redux';
import { delLikeFB, loadLikeFB } from '../redux/modules/likeReducer';
import { addLikeFB, userLikeFB } from '../redux/modules/likeReducer';

const Detail = ( { id, text, imgUrl, name, checkId, time, handler }) => {

  /* Reducer */
  const dispatch = useDispatch();

  const LikeCounts = useSelector((state) => state.likeReducer.list);
  const UserCounts = useSelector((state) => state.likeReducer.history);
  const likeCountTot = LikeCounts.filter((value) => {return ( value.post_id === id)});
  // 포스팅에 눌린 좋아요 수의 총계

  // const history = LikeCounts.filter((value) => {return ( value.user_name === checkId && value.post_id === id)});
  // 현재로그인한 유저가 좋아요를 누른 이력 확인 => 필요없는 로직
  const addLike = () => {
    console.log(checkId);
    dispatch(addLikeFB({user_name : checkId, post_id : id})); // 해당 포스트의 id 값과 좋아요를 누른 유저의 id를 DB 저장
  }

  const deleteLike = () => {
    dispatch(delLikeFB({name : checkId, id :id})); // 해당 포스트와 좋아요를 취소한 유저가 동일한 경우 DB 데이터 삭제 
  }

  const likeHandler = () => {
    UserCounts === true ? deleteLike() : addLike();
  } 

  const payload = {name : checkId, id :id};
  useEffect(() => {
    dispatch(loadLikeFB());
    dispatch(userLikeFB(payload));
  }, [dispatch]);

  return (
    <>
      <WrapBackground onClick = {handler}/>
        <DetailModal>
          <DatailBox>
            <div className = "card-img__datail">
              <div>
                <img className = "post-img__datail" alt = "ine" src = {imgUrl} ></img>
                <div className = "post__like-count" onClick = {likeHandler}>
                  { UserCounts ? (
                    <>
                    <FontAwesomeIcon style = {{ color : "salmon"}}icon = {faHeart} />
                    <span> like {likeCountTot.length}</span>
                    </>
                  ) : (
                    <>
                    <FontAwesomeIcon style = {{ color : "var(--purple)"}}icon = {faHeart} />
                    <span> like {likeCountTot.length}</span>
                    </>
                  )
                  }
                </div>
              </div>
              <div className = "card-detail">
                <div>
                  <div className = "card-header">
                    <div className = "card-header__img"></div>
                    <span style = {{ fontWeight : "800" }}>{name}</span>
                    <span style = {{ marginLeft : "90px", color : "grey"}}>{time}</span>
                  </div>
                  <div className = "card--context">
                    <span>{text}</span>
                  </div>
                  <div className = "comment-wrap">
                      <input placeholder = "댓글을 작성해주세요!" className = "comment__input"></input>
                      <button className = "comment__btn"><FontAwesomeIcon icon = {faPaperPlane} /></button>
                  </div>
                  <div className = "comment-box">
                    <div>
                      <div className = "comment-header">
                        <span>Comments</span>
                      </div>
                      <div className = "comment-main">
                        <div className = "comment-main__text">
                          <div className = "comment-main__pic"></div>
                          <span> 햄이네 : 댓글기능은 업데이트 예정이라네~</span>
                        </div>
                        <Line style = {{ backgroundColor : "var(--purple-2)", width : "100%"}}></Line>
                        <div className = "comment-main__text">
                          <div className = "comment-main__pic"></div>
                          <span> 아이네 : 그렇다네~</span>
                        </div>
                        <Line style = {{ backgroundColor : "var(--purple-2)", width : "100%"}}></Line>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DatailBox>
        </DetailModal>
    </>
  );
}

const WrapBackground = styled.div`
  position : fixed;
  top : 0;
  background-color: black;
  width : 100%;
  height: 100%;
  opacity: 60%;
  margin : 0;
`
const DetailModal = styled.div`
  position : fixed;
  top: 18%;

  width : 1000px;
  height: 600px;
  border-radius: 50px;
  background-color: var(--purple-2);

  display : flex;
  justify-content: center;
  align-items: center;
  z-index : 5;
`

const DatailBox = styled.div`
  background-color: white;
  width : 92%;
  height: 88%;
  padding-top : 40px;
  box-sizing: border-box;
  border-radius: 30px;
`

export default Detail;