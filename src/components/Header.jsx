/* Router */
import { Link } from 'react-router-dom';

/* Style */
import styled from 'styled-components';

const Header = () => {

  return (
    <HeaderBox>
      <Link to = "/"><TitleBox>
      <TitleLogo>HamIne</TitleLogo>
      </TitleBox></Link>
        <LoginBox>
        <Link to = "/login">
          <LoginBtn>LOGIN</LoginBtn>
        </Link>
        <Link to = "/signup">
          <LoginBtn style = {{ marginRight : "15px", marginLeft : "15px" }}>SIGN UP</LoginBtn>
        </Link>
      </LoginBox>
    </HeaderBox>
  );
}

export const HeaderBox = styled.div`
  box-sizing: border-box;
  width : 100%;
  height : 80px;
  background-color: #6bbaff;
  
  display : flex;
  justify-content: space-between;
  align-items: flex-end;

  padding : 15px;

  position : fixed;
  top : 0;

  z-index : 5;
`;

export const TitleBox = styled.div`
  width : 70%;
`;

export const TitleLogo = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-left: 30px;
`

export const LoginBox = styled.div`
  width : 30%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`

export const LoginBtn = styled.span`
  font-size: 14px;
`
export default Header;
