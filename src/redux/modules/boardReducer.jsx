/* Posing Reducer */
// connect DB
import { db } from '../../firebase-config';
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

/* INIT */
const initialState = {
  list : [],
  loading : false,
  error : null
}


/* ACTION TYPE */
// [ SERVER REQ ]
const GET_REQ = 'boardReducer/GET_REQ';
const REQ_SUCCESS = 'boardReducer/REQ_SECCESS';
const REQ_ERROR = 'boardReducer/REQ_ERROR';

// [ READ ]
const LOAD_POST = 'boardReducer/LOAD_POST';
const ADD_POST = 'boardReducer/ADD_POST';
const DELETE_POST = 'boardReducer/DELETE_POST';
const UPDATE_POST = 'boardReducer/UPDATE_POST';

/* ACTION FUNC */
// [ SERVER REQ ]
const getPostRequest = (payload) => {
  return { type : GET_REQ, payload }
};

const getPostSuccess = (payload) => {
  return { type : REQ_SUCCESS, payload }
};

const getPostError = (payload) => {
  return { type : REQ_ERROR, payload }
};

// [ READ ] - good
function loadPost (payload) {
  return { type : LOAD_POST, payload }
};
// [ CREATE ]
function addPost (payload) {
  return { type : ADD_POST, payload }
};
// [ DELETE ]
function deletePost (payload) {
  return { type : DELETE_POST, payload };
}
// [ UPDATE ]
function updatePost (payload) {
  return { type : UPDATE_POST, payload };
}


/* MIDDLEWARE */
// [ READ ]
export const loadPostFB = () => {
  return async function(dispatch) {
    dispatch(getPostRequest(true));
    try {
      const post_data = await getDocs(collection(db, "ineboard"));
      let post_list = [];

      post_data.forEach((doc) => {
        post_list.push( { id : doc.id, ...doc.data() } );
      });
      dispatch(loadPost(post_list));
    } catch (error) {
      dispatch(getPostError(error));
    } finally {
      dispatch(getPostRequest(false));
    }
  }};

// [ CREATE ]
export const addPostFB = (postData) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "ineboard"), postData);
    const post_data = { id:docRef.id, ...postData };
    dispatch(addPost(post_data));
  }
}

// [ DELETE ]
export const delPostFB = (payload) => async (dispatch, getState) => {
  const docRef = doc(db, "ineboard", payload);
  await deleteDoc(docRef);
  const post_idx = getState().boardReducer.list.fineIndex((value) => {
    return value.id === payload;
  });
  dispatch(deletePost(post_idx));
  dispatch(loadPostFB());
}

// [ UPDATE ]
export const updatePostFB = (payload, index) => async (dispatch) => {
  const docRef = doc(db, "ineboard", payload.id);
  await updateDoc(docRef, {
  
  })
}

/* REDUCER */
export default function postReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POST :
      return { ...state, list : action.payload}
    case ADD_POST :
      const newPostList = [...state.list];
      return { ...state, list : newPostList };
    case DELETE_POST :
      return {
        ...state,
        list : state.list.filter((value) => {
          return (value.id !== action.payload);
        })
      };
    case UPDATE_POST :
      return { ...state, list : [...state.list] }
    case GET_REQ :
      return { ...state, loading : action.payload };
    case REQ_SUCCESS :
      return { ...state, list : [...state.list, ...action.payload] };
    case REQ_ERROR :
      return { ...state, error : action.payload };
    default :
      return state;
  }
};