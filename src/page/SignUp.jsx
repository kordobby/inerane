import React from "react";

/* user Sign-up :: Auth */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';

// 1. addDoc : 원하는 컬렉션에 data 추가
import { collection, addDoc } from 'firebase/firestore';

/* Style */
import styled from 'styled-components';

/* Router */
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  /* Navigate */
  const navigate = useNavigate();

  /* input form => value 접근 */
  const idRef = React.useRef();
  const nameRef = React.useRef();
  const pwRef = React.useRef();

  /* Sign-up Func */
  // 비동기 요청 => FB에 요청을 하는 것이니까! 그러니, async-await 사용
  const signUpFB = async () => {
    const userInfo = await createUserWithEmailAndPassword( auth,
                                                           idRef.current.value,
                                                           pwRef.current.value );
 
    // console.log(userInfo);
  /* DB DATA 저장 확인 */
  const userData = await addDoc(collection(db, "user-info"), { userId:idRef.current.value,
                                                               userName:nameRef.current.value });
  // console.log(userData.id);
  alert("회원가입 성공! 바로 로그인 해드릴게요! :-)")
  navigate('/') };

  return (
    <SignUpWrap>
      <input ref = {idRef} type = "email" required placeholder="이메일기입"></input>
      <input ref = {nameRef} type = "text" required placeholder="이름작성"></input>
      <input ref = {pwRef} minLength="6" maxLength="12" type = "password" required placeholder="비밀번호확인"></input>
      <button onClick = {signUpFB}>가입하기</button>
    </SignUpWrap>
  );
}

const SignUpWrap = styled.div`
  display : flex;
  width : 100%;
  height : 100vh;
  justify-content: center;
  align-items: center;
`
export default SignUp;