import { getCookie } from "../cookies";
import { db } from '../../firebase-config';
import { getDocs, where, collection, query } from 'firebase/firestore';

const initUser = {
  user : {
    userId : null,
    userName : null,
    userImg : null
  },
  loading : false,
  error : null
}

/* ACTION TYPE */
// login state user's info LOAD 
const GET_USER = 'userReducer/GET_USER';

// server communication
const LOGIN_REQ = 'userReducer/LOGIN_REQ';
const LOGIN_SUCCESS = 'userReducer/LOGIN_SUCCESS';
const LOGIN_ERROR = 'userReducer/LOGIN_ERROR';

/* ACTION FUNC */
// #1. server communication
export const loginRequest = (payload) => {
  return { type : LOGIN_REQ, payload }
};

export const loginSuccess = (payload) => {
  return { type : LOGIN_SUCCESS, payload }
};

export const loginError = (payload) => {
  return { type : LOGIN_ERROR, payload }
}

// #2. load login-state user
const getUser = (payload) => {
  return { type : GET_USER, payload}
}

/* MIDDLE-WARE */
// 쿠키에 저장된 user-id 를 가져와서 DB에 있는 해당 유저의 데이터를 조회, store 에 저장!
export const getUserFB = () => {
  return async function (dispatch) {
    let cookie = getCookie("user_id");
    console.log(cookie);
    let getUserInfo = []; // DB에서 가져온 유저 정보 저장
    const nowUser = await getDocs(query(collection(db, "user-info"), where("userId", "==", cookie)));
    nowUser.forEach( doc => {
      getUserInfo.push({ id: doc.id, ...doc.data() });
    });
    console.log(getUserInfo);
    console.log(getUserInfo.userId);
    dispatch(getUser(getUserInfo));
}};

/* REDUCER */
export default function userReducer ( state = initUser, action) {
  switch (action.type) {
    case GET_USER : {
      return {...state, user : action.payload}
    }
    case LOGIN_REQ : {
      return { ...state, loading : action.payload };
    }
    case LOGIN_ERROR : {
      return { ...state, error : action.payload };
    }
    default :
    return state;
  }
}