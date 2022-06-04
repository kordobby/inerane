import { getCookie } from "../cookies";
import { db } from '../../firebase-config';
import { getDocs, where, collection, query } from 'firebase/firestore';

const initUser = {
  user : {
    userId : null,
    userName : null,
    userImg : null
  }
}

const GET_USER = 'userReducer/GET_USER';

const getUser = (payload) => {
  return { type : GET_USER, payload}
}

export const getUserFB = () => {
  return async function (dispatch) {
    let cookie = getCookie("user_id");
    console.log(cookie);
    let getUserInfo = []; // DB에서 가져온 유저 정보 저장
    const nowUser = await getDocs(query(collection(db, "user-info"), where("userId", "==", cookie)));
    nowUser.forEach( doc => {
      getUserInfo.push({ id: doc.id, ...doc.data() });
    });
    dispatch(getUser(getUserInfo));
}};

export default function userReducer ( state = initUser, action) {
  switch (action.type) {
    case GET_USER : {
      return {...state, user : action.payload}
    }
    default :
    return state;
  }
}