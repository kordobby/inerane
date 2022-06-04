import React from 'react';
import { useEffect } from 'react';

/* import Pages */
import Home from './page/Home';
import SignUp from './page/SignUp';
import Login from './page/Login';

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
import { deleteCookie } from './redux/cookies';

function App() {
  const dispatch = useDispatch();

  /* 로그인 func으로 옮김 */
  // 현재 로그인 중인 user data Load => Store state update
  // useEffect(() => {
  //   dispatch(getUserFB());
  // }, [dispatch]);

  // Login user data 받아오기
  const nowUserState = useSelector((state) => state.userReducer);
  // console.log(is_login); // Login state check
  // console.log(nowUserState.user[0]);  // Login user's info

  const userDataList = nowUserState?.user[0];
  console.log(userDataList);
  const nickName = userDataList?.userName;
  console.log(nickName);
  /*
  nowUserState = {
    user : [  ]
  }
  */
// 로그인 상태관리를 위해 useState 사용 : false(로그아웃 상태), true(로그인 상태)
  const [is_login, setIsLogin] = React.useState(false);
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
      { /* login 상태에 따른 Header 설정 변경 + Posting btn도 비슷하게 구현해봐야지 */ }
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
     </Routes>
    </>
  );
}

export default App;