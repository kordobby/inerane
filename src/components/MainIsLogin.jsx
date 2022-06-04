/* Style */
import styled from 'styled-components';
import IneCard from './IneCard';
import { useSelector } from 'react-redux';

const MainIsLogin = () => {

  const myPostList = useSelector((state) => state.boardReducer.list);
  // console.log(myPostList);

  return (
    <div className = "timeline-wrap">
      <TimeLine> 
        <IneCard />
        <IneCard />
        <IneCard />
      </TimeLine>
    </div>
  );
}

const TimeLine = styled.div`
  margin-top: 80px;

  width : 60%;
  height : 100vh;
  background-color: #f5e6ff;
  /* display : flex;
  flex-direction: column;
  align-items: center; */

  display : grid;
  grid-template-columns: 100%;
  grid-template-rows : repeat(5, 300px);
  place-items: center;
`

export default MainIsLogin;