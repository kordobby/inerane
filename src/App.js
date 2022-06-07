import React from 'react';
import { useEffect } from 'react';

/* import Pages */
import Home from './page/Home';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Post from './page/Post';
import Update from './page/Update';

/* import Components */
import Header from './components/Header';
import HeaderIsLogin from './components/HeaderIsLogin';

/* Reducer */
import { useSelector, useDispatch } from 'react-redux';
import { getUserFB } from './redux/modules/userReducer';

/* Router setup */
import { Routes, Route } from 'react-router-dom';

/* Signup Feature :: auth */
import { auth } from './firebase-config';

/* Login Feature :: auth */
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getCookie, deleteCookie } from './redux/cookies';

function App() {
  const dispatch = useDispatch();

  /* 로그인 func으로 옮김 */
  // 현재 로그인 중인 user data Load => Store state update
  useEffect(() => {
    dispatch(getUserFB());
  }, [dispatch]);

  // Login user data 받아오기
  const nowUserState = useSelector((state) => state.userReducer);
  // console.log(is_login); // Login state check
  // console.log(nowUserState.user[0]);  // Login user's info

  const userDataList = nowUserState?.user[0];
  console.log(userDataList);
  const userIdCheck = userDataList?.userId;
  const userPropImg = userDataList?.imgUrl;
  const nickName = userDataList?.userName;
  console.log(nickName);


  /* 로그인 상태관리 */
  // #1. Cookie 여부에 따른 확인
  // #2. Auth 를 통한 확인

  // 로그인 상태관리를 위해 useState 사용 : false(로그아웃 상태), true(로그인 상태)
  const userIsLogin = getCookie("user_id");
  const [is_login, setIsLogin] = React.useState(false);

  // #1 망한 버전임
  // const loginCheck = () => {
  //   if (userIsLogin !== undefined) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }

  // #2
  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  // Side Effect 확인하는 것이기 때문에, login check는 useEffect
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  /* Logout Function */
  const logout = () => {
    signOut(auth).then(()=> {setIsLogin(false);});
    deleteCookie("user_id");
  }

  return (
    <>
      { /* login 상태에 따른 Header 설정 변경 */ }
      {is_login ? (
        <>
        <HeaderIsLogin name = {nickName} logout = {logout}/>
        </>
      ) : (
        <>
        <Header/>
        </>
      )}
     <Routes>
        <Route path="/" element = { <Home login ={is_login} /> } />
        <Route path="/signup" element = { <SignUp /> } />
        <Route path="/login" element = { <Login /> } />
        <Route path="/update/:id/:idx" element = { <Update idCheck = {userIdCheck} userProfile = {userPropImg} name = {nickName} /> } />
        <Route path="/post" element = { <Post idCheck = {userIdCheck} userProfile = {userPropImg} name = {nickName}/> } />
     </Routes>
    </>
  );
}

export default App;