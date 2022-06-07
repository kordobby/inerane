import React from "react";

/* FireBase Setup */
import { collection, addDoc } from 'firebase/firestore';
// user sign up 
import { createUserWithEmailAndPassword } from 'firebase/auth';  // 회원가입 function
import { auth, db, storage } from '../firebase-config';  
// file upload
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/* Cookies */
import { setCookie, getCookie } from "../redux/cookies";

/* Style */
import styled from 'styled-components';
import { Line, UserTitle, LoginPageBox, InputBox, Button } from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKiwiBird } from "@fortawesome/free-solid-svg-icons";


/* Router */
import { useNavigate } from "react-router-dom";

import { getUserFB } from "../redux/modules/userReducer";
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();

  /* Navigate */
  const navigate = useNavigate();

  /* input form => value 접근 */
  const idRef = React.useRef();
  const nameRef = React.useRef();
  const pwRef = React.useRef();
  const fileLinkRef = React.useRef();

  /* Sign-up Func */
  // 비동기 요청 => FB에 요청을 하는 것이니까! 그러니, async-await 사용
  const signUpFB = async () => {
  const password = pwRef.current.value;
  const email = idRef.current.value;
  const checkEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/

  if ( password.length < 6) {
    alert("비밀번호는 6자리 이상으로 작성해주세요!")
  } else if ( !checkEmail.test(email) ) {
    alert("이메일 형식이 올바르지 않습니다!")
  } else {
      const userInfo = await createUserWithEmailAndPassword( auth,
                                                              idRef.current.value,
                                                              pwRef.current.value );
      /* DB DATA 저장 확인 => DB에 저장됨 */
      const userData = await addDoc(collection(db, "user-info"), { userId:idRef.current.value,
                                                                  userName:nameRef.current?.value,
                                                                  imgUrl:fileLinkRef.current?.url });
      
      setCookie("user_id", idRef.current.value);
      let cookie = getCookie("user_id");
      console.log(cookie);

      dispatch(getUserFB());
      console.log("끝")
      alert("회원가입 성공! 바로 로그인 해드릴게요! :-)")
      navigate('/')
    }
 };

  const uploadProfileFB = async (event) => {
    console.log(event.target.files)
    const uploaded_profile = await uploadBytes(
      ref(storage, `images/${event.target.files[0].name}`),
      event.target.files[0]);
    console.log(uploaded_profile);

    const file_url = await getDownloadURL(uploaded_profile.ref);
    fileLinkRef.current = { url : file_url };
    console.log(file_url);
  };

  return (
    <SignUpWrap>
      <LoginPageBox style = {{height : "500px"}}>
        <UserTitle>SIGN UP</UserTitle>
        <InputBox ref = {idRef} type = "email" required placeholder="사용하실 e-mail ID 를 입력해주세요."></InputBox>
        <Line/>
        <InputBox ref = {nameRef} type = "text" required placeholder="닉네임을 입력해주세요."></InputBox>
        <Line/>
        <InputBox ref = {pwRef} minLength="6" maxLength="12" type = "password" required placeholder="비밀번호를 작성해주세요. (6자리 이상)"></InputBox>
        <Line/>
        <div className = "filebox">
          <input className = "upload-img"
                value = "프로필 이미지를 선택해주세요!"
                placeholder = "프로필 이미지를 선택해주세요!"
                style = {{margin : "20px 0"}} 
                required
                onChange = {uploadProfileFB}></input>
          <label htmlFor ="file">파일 찾기</label>
          <input type ="file" id = "file" onChange = {uploadProfileFB} required/>
        </div>

        <Button onClick = {signUpFB}><FontAwesomeIcon icon = {faKiwiBird} /></Button>
      </LoginPageBox>
    </SignUpWrap>
  );
}

export const SignUpWrap = styled.div`
  margin-top: 30px;
  display : flex;
  justify-content: center;
  align-items: center;

  width : 100%;
  height : 100vh;
`
export default SignUp;