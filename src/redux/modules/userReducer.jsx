// load 만 해오면 되려나?

import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const LOAD_USER = 'userReducer/LOAD_USER';

const initUser = {
  isLogin : false,
  userId : "",
  userName : "",
  userImg : ""
}

function loadUser (payload) {
  return { type : LOAD_USER, payload }
}

export const loadUserFB = () => {
  return async function (dispatch) {
    const user_data = await(collection(db, "user-info"));
    let user_list = [];

    user_data.forEach((doc) => {
      user_list.push( { id : doc.id, ...doc.data() });
    });
    dispatch(loadUser(user_list));
  }
}

export default function userReducer( state = initUser, action ) {
  switch (action.type) {
    case LOAD_USER : {
      return {...state, list: action.user_list}
    }
    default : 
    return state;
  }
}