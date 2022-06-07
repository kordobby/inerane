import React, { useEffect } from "react";

/* Style */
import styled from 'styled-components';
import { LoginPage, Line, UserTitle, LoginPageBox, InputBox, Button } from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKiwiBird } from "@fortawesome/free-solid-svg-icons";

/* Router */
import { useNavigate, useParams } from "react-router-dom";

// file upload
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-config';  

/* Reducer */
import { useDispatch, useSelector } from 'react-redux';
import { updatePostFB } from "../redux/modules/boardReducer";

const Update = ( { name, idCheck } ) => {

  // 현재 페이지 parameter 받아오기 : id, idx
  const { id, idx } = useParams();

  // get Store Data
  const haminePost = useSelector((state) => state.boardReducer.list);
  const postData = haminePost[idx];
  console.log(idx);
  
  // Reducer 사용
  const dispatch = useDispatch();

  // 저장 시 화면 전환되도록
  const navigate = useNavigate();

  // console.log(props.name);
  // ref about post
  const newTextRef = React.useRef(null);
  const newImgRef = React.useRef(null);

  /* 기존 정보 띄우기 */
  useEffect(() => {
    newTextRef.current.value = postData?.ineText;
  })
  /* Input value 받아오기 위해 DOM 접근, useRef */
  const updatePostHandler = () => {

    setTimeout(() => {
      dispatch(
        updatePostFB(
          { id : id,
            userId : name,
            checkId : idCheck,
            ineText : newTextRef.current.value,
            ineImg : newImgRef?.current?.url
          }, idx));
      alert("수정 되었다네!")
      navigate('/');
    }, 3000)
  };



  const updateImgHandler = async (event) => {
    const updatedImg = await uploadBytes(
      ref(storage, `images/${event.target.files[0].name}`),
      event.target.files[0]);
    const new_img_url = await getDownloadURL(updatedImg.ref);
    newImgRef.current = { url : new_img_url };
  }

  return (
    <LoginPage>
      <LoginPageBox style = {{height : "500px"}}>
        <UserTitle>수정할거라네</UserTitle>
        <InputBox ref = {newTextRef} type = "text" placeholder ="내가 그린 햄이네를 소개해주세요!"></InputBox>
        <Line/> 
        <div className = "filebox">
          <input className = "upload-img"
                value = "프로필 이미지를 선택해주세요!"
                placeholder = "내가 그린 햄이네를 올려주세요!"
                style = {{margin : "20px 0"}} 
                required
                onChange = {updateImgHandler}></input>
          <label htmlFor ="file">파일 찾기</label>
          <input type ="file" id = "file" onChange = {updateImgHandler} required/>
        </div>

        <Button onClick = {updatePostHandler}><FontAwesomeIcon icon = {faKiwiBird} /></Button>
      </LoginPageBox>
    </LoginPage>
  )
}

// const 

export default Update;