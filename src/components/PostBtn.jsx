/* Router */
import { Link } from 'react-router-dom';

/* Style */
import styled from 'styled-components';

const PostBtn = () => {

  return (
    <PostWrap>
      <Link to = "/post"><PostLink>i</PostLink></Link>
    </PostWrap>
  );
}

const PostWrap = styled.div`
  width : 100%;
  height : 100vh;
  display : flex;
  justify-content: flex-end;
  align-items: flex-end;
  position : fixed;
  top : 0;
  z-index : 5;
`
const PostLink = styled.div`
  width : 50px;
  height : 50px;
  border-radius: 50px;
  border : none;
  &:hover { background-color : blue }

  background-color: yellow;
  margin-right: 30px;
  margin-bottom : 30px;

  display : flex;
  justify-content: center;
  align-items: center;
`

export default PostBtn;
