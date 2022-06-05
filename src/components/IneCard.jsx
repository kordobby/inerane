/* Style */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

/* Reducer */
import { useDispatch } from 'react-redux';
import { delPostFB } from '../redux/modules/boardReducer';

/* Routes */
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../redux/cookies";
const IneCard = ( {id, text, idx, imgUrl, name, checkId} ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deletePostHandler = (id) => {
    // if userName == writer => 삭제 : alert "작성자가 아닙니다!"
    dispatch(delPostFB(id));
    alert("삭제완료!")
  }

  const updatePostHandler = () => {
    navigate(`/update/${id}/${idx}`);
  }

  let checkIdCookie = getCookie("user_id");
  // console.log(checkIdCookie); => 잘 가져오는 것 확인

  return (
    <CardWrap>
      <div className = "card-header">
        <div className = "card-header__img"></div>
        <span>{name}</span>
      </div>
      <div className = "card-main">
        <img className = "post-img" alt = "ine" src = {imgUrl} style = {{ width : "220px", height : "220px", borderRadius : "20px"}}></img>
        <div>{text}</div> 
      </div>
      { checkId === checkIdCookie ? (
      <div className = "card-footer">
        <button className = "card-footer__btn" onClick = {() => {deletePostHandler(id)}}><FontAwesomeIcon icon = {faTrashCan}/></button>
        <button className = "card-footer__btn" onClick = {updatePostHandler}><FontAwesomeIcon icon = {faPenToSquare} /></button>
      </div>
      ) : (
        <></>
      )
      }
    </CardWrap>
  );
}

const CardWrap = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  width : 300px;
  height : 400px;
  background-color: white;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  display : flex;
  flex-direction : column;
  align-items : center;

  box-sizing : border-box;
  padding : 20px;
`

export default IneCard;