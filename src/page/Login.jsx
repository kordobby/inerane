import React from "react";

/* Style */
import styled from 'styled-components';

/* Auth setup */
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; 

/* Router */
import { useNavigate } from "react-router-dom";

const Login = () => {

  /* Navigate */
  const navigate = useNavigate();

  /* input form => value 접근 */
  const idRef = React.useRef();
  const pwRef = React.useRef();

  const loginFB = async() => {
    console.log(idRef.current.value);
    const userInfo = await signInWithEmailAndPassword( auth,
                                                       idRef.current.value,
                                                       pwRef.current.value);
    // console.log(userInfo);
    alert("어서오세요! :-)")
    navigate('/') 
  };
return (
  <LoginPage>
    <div>ID(email) : <input ref = {idRef} ></input></div>
    <div>PW : <input required type = "password" ref = {pwRef} minLength="6" maxLength="12" ></input></div>
    {/* img upload */}
    <button onClick = {loginFB}>login</button>
  </LoginPage>
)
}

const LoginPage = styled.div`
  margin-top: 150px;
`

export default Login;