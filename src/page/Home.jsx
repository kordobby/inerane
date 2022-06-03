import PostBtn from "../components/PostBtn";
import Main from "../components/Main";
import MainIsLogin from "../components/MainIsLogin";

import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadPostFB } from "../redux/modules/boardReducer";

const Home = ( {login} ) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostFB());
  }, [dispatch]);

  return (
    <>
      { /* login 상태에 따른 Header 설정 변경 + Posting btn도 비슷하게 구현해봐야지 */ }
      { login ? (
          <>
          <PostBtn/>
          <MainIsLogin/>
          </>
          ) : ( <Main/> )}
    </>
  )
}

export default Home;