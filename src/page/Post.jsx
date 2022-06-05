import React from "react";

/* Style */
import { LoginPage, Line, UserTitle, LoginPageBox, InputBox, Button } from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKiwiBird } from "@fortawesome/free-solid-svg-icons";

/* Router */
import { useNavigate } from "react-router-dom";

// file upload
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-config';  

/* Reducer */
import { useSelector, useDispatch } from 'react-redux';
import { addPostFB } from "../redux/modules/boardReducer";

const Post = ( { name, idCheck } ) => {
  // Reducer 사용
  const dispatch = useDispatch();
  const nowPostsState = useSelector((state) => state.boardReducer);

  // 저장 시 화면 전환되도록
  const navigate = useNavigate();

  // console.log(props.name);
  // ref about post
  const textRef = React.useRef(null);
  const imgRef = React.useRef(null);
  console.log(nowPostsState);
  const addPostHandler = () => {

    setTimeout(() => {
      dispatch(addPostFB({
        userId : name,
        checkId : idCheck,
        ineText : textRef.current?.value,
        ineImg : imgRef.current?.url
      }));
      console.log("posted!")
      alert("포스팅완료!")
      console.log(nowPostsState);
      navigate('/');
    }, 3000)
  };

  

  const addImgHandler = async (event) => {
    console.log("start")
    const uploadedImg = await uploadBytes(
      // setFileImg(URL.createObjectURL(event.target.files[0]))
      ref(storage, `images/${event.target.files[0].name}`),
      event.target.files[0]);
    const img_url = await getDownloadURL(uploadedImg.ref);
    imgRef.current = { url : img_url };
    console.log("end")
  }

return (
    <LoginPage>
      <LoginPageBox style = {{height : "500px"}}>
        <UserTitle>MY SWEET INE {name}</UserTitle>
        <InputBox ref = {textRef} type = "text" placeholder ="내가 그린 햄이네를 소개해주세요!"></InputBox>
        <Line/> 
        <div className = "filebox">
          <input className = "upload-img"
                value = "프로필 이미지를 선택해주세요!"
                placeholder = "내가 그린 햄이네를 올려주세요!"
                style = {{margin : "20px 0"}} 
                required
                onChange = {addImgHandler}></input>
          <label htmlFor ="file">파일 찾기</label>
          <input type ="file" id = "file" onChange = {addImgHandler} required/>
        </div>

        <Button onClick = {addPostHandler}><FontAwesomeIcon icon = {faKiwiBird} /></Button>
      </LoginPageBox>
    </LoginPage>
  )
}

// const 

export default Post;