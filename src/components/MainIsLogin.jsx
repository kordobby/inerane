import { useEffect } from 'react';

/* Style */
import styled from 'styled-components';
import IneCard from './IneCard';
import { Button } from '../page/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/* Reducer */
import { loadPostFB } from '../redux/modules/boardReducer';
import { useDispatch, useSelector } from 'react-redux'; 

/* Router */
import { Link } from 'react-router-dom';

const MainIsLogin = () => {

    /* store 에 저장된 state 가져오기 */
  const HamineList = useSelector((state) => state.boardReducer.list);
  console.log(HamineList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadPostFB());
  }, [dispatch]);

  return (
    <div className = "timeline-wrap" style = {{ marginTop : "80px" }} >
      <TimeLine> 
          <PostingCard style = {{ backgroundColor : "var(--purple-1"}}>
            <img
              style = {{ width : "240px", height : "240px", borderRadius : "120px", marginBottom : "20px"}}
              src = {"https://firebasestorage.googleapis.com/v0/b/inerane-6b7c7.appspot.com/o/images%2Fhamine.png?alt=media&token=1cf66cbe-c920-4348-bd3b-23ea392dca54"} />
            <span style = {{ fontWeight : "700", fontSize : "20px" }}>내가 그린 햄이네 올리기!</span>
            <Link to = "/post"><Button><FontAwesomeIcon icon ={faPlus}/></Button></Link>
          </PostingCard>
        { HamineList.map((value, index) => {
          return <IneCard 
          key = {value.id} 
          text = {value.ineText} 
          imgUrl = {value.ineImg}
          name = {value.userId}
          idx = {index}
          id = {value.id}
          checkId = {value.checkId} >
          </IneCard>
        })}
      </TimeLine>
    </div>
  );
}

const TimeLine = styled.div`
  width : 100%;
  background-color: var(--purple);
  /* display : flex;
  flex-direction: column;
  align-items: center; */

  display : grid;
  grid-template-columns:  repeat(4, 25%);
  grid-template-rows : repeat(1, 500px);
  place-items: center;
`
const PostingCard = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  width : 300px;
  height : 400px;
  background-color: white;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px;

  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default MainIsLogin;