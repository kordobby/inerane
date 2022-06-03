/* Router */
import { Link } from 'react-router-dom';

/* Style */
// import styled from 'styled-components';
import { HeaderBox } from './Header';
import { TitleBox } from './Header';
import { TitleLogo } from './Header';
import { LoginBox } from './Header';
import { LoginBtn } from './Header';

const HeaderIsLogin = ( props ) => {

  return (
    <HeaderBox>
      <Link to = "/"><TitleBox>
        <TitleLogo>HamIne</TitleLogo>
      </TitleBox></Link>

      <LoginBox>
        <LoginBtn>"아이네"님 하이네!</LoginBtn>
        <button  style = {{ marginRight : "15px", marginLeft : "15px" }} className = "logout-btn" onClick = {props.logout}>LOGOUT</button>
      </LoginBox>
    </HeaderBox>
  );
}

export default HeaderIsLogin;
