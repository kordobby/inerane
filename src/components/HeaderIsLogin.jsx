import React from 'react';
import { useEffect } from 'react';

/* Router */
import { Link } from 'react-router-dom';

/* Reducer */
import { useSelector, useDispatch } from 'react-redux';
import { getUserFB } from '../redux/modules/userReducer';

/* Style */
// import styled from 'styled-components';
import { HeaderBox } from './Header';
import { TitleBox } from './Header';
import { TitleLogo } from './Header';
import { LoginBox } from './Header';
import { LoginBtn } from './Header';

const HeaderIsLogin = ( {logout, name} ) => {

  return (
    <HeaderBox>
      <Link to = "/"><TitleBox>
        <TitleLogo>HamIne</TitleLogo>
      </TitleBox></Link>

      <LoginBox>
        <LoginBtn style = {{ color : "white" }}> {name}님 하이네!</LoginBtn>
        <button  style = {{ marginRight : "15px", marginLeft : "15px" }} className = "logout-btn" onClick = {logout}>LOGOUT</button>
      </LoginBox>
    </HeaderBox>
  );
}

export default HeaderIsLogin;
