import React from 'react';

/* import Pages */
import Home from './page/Home';
import SignUp from './page/SignUp';
import Login from './page/Login';

/* import Components */
import Header from './components/Header';
import HeaderIsLogin from './components/HeaderIsLogin';

/* Router setup */
import { Routes, Route } from 'react-router-dom';

/* Signup Feature :: auth */
import { auth, db } from './firebase-config';


/* Login Feature :: auth */
import { onAuthStateChanged, signOut } from 'firebase/auth';
import PostBtn from './components/PostBtn';

function App() {
  const [is_login, setIsLogin] = React.useState(false);

  console.log(is_login); // Login state check
  console.log(auth.currentUser); // Login state user check

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
  }


  return (
    <>
      { /* login 상태에 따른 Header 설정 변경 + Posting btn도 비슷하게 구현해봐야지 */ }
      {is_login ? (
        <>
        <HeaderIsLogin logout = {logout}/>
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