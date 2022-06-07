import React, { useState } from 'react';

import Detail from './Detail';
/* Style */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

/* Reducer */
import { useDispatch } from 'react-redux';
import { delPostFB } from '../redux/modules/boardReducer';

/* Routes */
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../redux/cookies";
const IneCard = ( { id, text, idx, imgUrl, name, checkId, time } ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkIdCookie = getCookie("user_id");

  const deletePostHandler = (id) => {
    // if userName == writer => 삭제 : alert "작성자가 아닙니다!"
    dispatch(delPostFB(id));
    alert("삭제완료!")
  }

  const updatePostHandler = () => {
    navigate(`/update/${id}/${idx}`);
  }

  const [ modal, setModal ] = useState(false);

  const modalHandler = () => {
    modal === true ?  setModal(false) : setModal(true)
  }



  //id, text, idx, imgUrl, name, checkId, time
  return (
    <>
    { modal ? (
    <Detail
      id = {id}
      text = {text}
      imgUrl = {imgUrl}
      name = {name}
      checkId = {checkIdCookie}
      time = {time}
      handler = {modalHandler}
      ></Detail>
    ) : (
      <></>
    )}
    <CardWrap onClick = {modalHandler}>
      <div className = "card-header">
        <img className = "card-header__img" src = {"https://firebasestorage.googleapis.com/v0/b/inerane-6b7c7.appspot.com/o/images%2Fhamine.png?alt=media&token=1cf66cbe-c920-4348-bd3b-23ea392dca54"}/>
        {/* <div className = "card-header__img"></div> */}
        <span>{name}</span>
      </div>
      <div className = "card-main">
        <img className = "post-img" alt = "ine" src = {imgUrl} style = {{ width : "220px", height : "220px", borderRadius : "20px"}}></img>
        <div>{text}</div> 
      </div>
      { checkId === checkIdCookie ? (
      <div className = "card-footer">
        <button className = "card-footer__btn" onClick = {() => {deletePostHandler(id)}}><FontAwesomeIcon icon = {faTrashCan}/></button>
        <button className = "card-footer__btn" onClick = {updatePostHandler}><FontAwesomeIcon icon = {faPenToSquare} /></button>
      </div>
      ) : (
        <></>
      )
      }
    </CardWrap>
    </>
  );
}

const CardWrap = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  width : 300px;
  height : 400px;
  background-color: var(--purple-4);
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  display : flex;
  flex-direction : column;
  align-items : center;

  box-sizing : border-box;
  padding : 20px;
`

export default IneCard;