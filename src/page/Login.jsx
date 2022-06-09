import React from "react";
/* Style */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

/* Auth setup */
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; 

/* Router */
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie } from "../redux/cookies";
import { getUserFB } from "../redux/modules/userReducer";
import { useDispatch } from 'react-redux';

const Login = () => {

  /* Navigate */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* input form => value 접근 */
  const idRef = React.useRef();
  const pwRef = React.useRef();

  const loginFB = async() => {  

    try {
    // console.log(idRef.current.value);
    const userInfo = await signInWithEmailAndPassword( auth,
      idRef.current.value,
      pwRef.current.value);

      setCookie("user_id", idRef.current.value);
      let cookie = getCookie("user_id");
      console.log(cookie);
  
      dispatch(getUserFB());
    // 현재 로그인 중인 유저 정보 끌어오기
    // console.log(userInfo.user.email);
      alert("어서오세요! :-)")
      navigate('/') 
    } catch (error) {
      alert("Id 또는 비밀번호가 틀렸습니다!")
      idRef.current.value = "";
      pwRef.current.value = "";
    }
  }

return (
  <LoginPage>
    <LoginPageBox>
    <UserTitle>LOGIN</UserTitle>
    <InputBox ref = {idRef} placeholder = "e-mail ID" required></InputBox>
    <Line/>
    <InputBox required type = "password" ref = {pwRef} minLength="6" maxLength="12" placeholder = "비밀번호 (6자리 이상)" ></InputBox>
    <Line/>
    {/* img upload */}
    <Button onClick = {loginFB}><FontAwesomeIcon icon = {faRightToBracket}/></Button>
    </LoginPageBox>
  </LoginPage>
)
}

export const LoginPage = styled.div`
  margin-top: 30px;
  display : flex;
  justify-content: center;
  align-items: center;

  width : 100%;
  height : 100vh;
`
export const UserTitle = styled.span`
  font-size : 40px;
  font-weight : 700;
  margin-bottom: 10px;
`;

export const LoginPageBox = styled.div`
  width : 500px;
  height : 300px;

  box-sizing: border-box;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 50px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export const InputBox = styled.input`
  width : 70%;
  height : 50px;

  background-color: #f5f5f5;
  border: none;

  font-size: 15px;
  text-align: center;
`
export const Button = styled.button`
  margin-top: 10px;
  width : 50px;
  height : 50px;
  border-radius: 50px;

  font-size: 18px;
  color : black;

  background-color: var(--purple);
  color : white;
  &:hover {
    background-color: black;
    color : white;
  }
  border : none;
`

export const Line = styled.div`
  height : 1px;
  background-color : black;
  width : 70%;
  margin-bottom: 10px;
`
export default Login;