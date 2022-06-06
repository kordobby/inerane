/* Like Count Reducer */

// connect FB
import { db } from '../../firebase-config';
import { addDoc, collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';

/* INIT */
const initLikeCount = {
  list : [],
  history : false  // true/false
}

/* ACTION TYPE */
const LOAD_LIKE = 'likeReducer/LOAD_LIKE';
const ADD_LIKE = 'likeReducer/ADD_LIKE';
const DELETE_LIKE = 'likeReducer/DELETE_LIKE';
const USER_LIKE = 'likeReducer/USER_LIKE';

/* ACTION FUNC */
const loadLike = (payload) => {
  return { type : LOAD_LIKE, payload }
};

const addLike = (payload) => {
  return { type : ADD_LIKE, payload }
}

const deleteLike = (payload) => {
  return { type : DELETE_LIKE, payload };
}

const userLike = (payload) => {
  return { type : USER_LIKE, payload }
};

/* MIDDLEWARE */
export const loadLikeFB = () => {
  return async function(dispatch) {
    const like_data = await getDocs(collection(db, "likes"));
    const like_list = []; // 모든 게시물 좋아요

    like_data.forEach((doc) => {
      like_list.push({ id : doc.id, ...doc.data() });
    });
    console.log("좋아요현황");
    dispatch(loadLike(like_list)); 
  }
};

export const userLikeFB = (payload) => {
  return async function(dispatch) {
    const user_data = await getDocs(query(collection(db, "likes"), where("user_name", "==", payload.name), where("post_id", "==", payload.id)));
    let user_like = [];
    user_data.forEach((doc) => {
      user_like.push({ id: doc.id, ...doc.data()});
    });
    dispatch(userLike(user_like.length === 0 ? false : true)); // boolean 값 만들기 
  }
}

export const addLikeFB = (payload) => {
  return async function(dispatch) {
    const docRef = await addDoc(collection(db, "likes"), payload);
    const like_data = { id:docRef.id, ...payload };
    console.log(like_data);
    dispatch(addLike(like_data));
    dispatch(userLike(true));
  };
};

export const delLikeFB = (payload) => async (dispatch, getState) => {
  const getLikeInfo = [];
  const findId = await getDocs(query(collection(db, "likes"), where("user_name", "==", payload.name), where("post_id", "==", payload.id)));
  findId.forEach( doc => {
    getLikeInfo.push({ id: doc.id, ...doc.data() });
  });
  // console.log(findId);
  // console.log(getLikeInfo); // [0] : { id : ...., post_id : ..., user_name : ...} ...
  // console.log(payload.name);
  const focusingData = getLikeInfo.filter((value) => {
    return (value.user_name === payload.name && value.post_id === payload.id)
  })
  console.log(focusingData[0].id);
  const docRef = doc(db, "likes", focusingData[0].id);
  await deleteDoc(docRef);
  const like_idx = getState().likeReducer.list.findIndex((value) => {
  return value.user_name === payload.name && value.post_id === payload.id;
  }
  );
  dispatch(deleteLike(like_idx));
  dispatch(userLike(false));
}


/* REDUCER */
export default function likeReducer(state = initLikeCount, action = {}) {
  console.log(action);
  switch (action.type) {
    case LOAD_LIKE :
      return { ...state, list : [...action.payload] };
    case USER_LIKE :
      return { ...state, history : action.payload };
    case ADD_LIKE :
      return { ...state, list : [...state.list, action.payload]
       };
    case DELETE_LIKE :
      return {
        ...state,
        list : state.list.filter((value, index) => {
          return (index !== action.payload);
        })
      };
    default :
    return state;
  }
};

