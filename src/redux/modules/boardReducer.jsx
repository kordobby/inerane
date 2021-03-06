/* Posting Reducer */
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

// [ CRUD ]
const LOAD_POST = 'boardReducer/LOAD_POST';
const ADD_POST = 'boardReducer/ADD_POST';
const DELETE_POST = 'boardReducer/DELETE_POST';
const UPDATE_POST = 'boardReducer/UPDATE_POST';

/* ACTION FUNC */
// [ SERVER REQ ]
export const getPostRequest = (payload) => {
  return { type : GET_REQ, payload }
};

export const getPostSuccess = (payload) => {
  return { type : REQ_SUCCESS, payload }
};

export const getPostError = (payload) => {
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
      const post_data = await getDocs(collection(db, "hamgallery"));
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
export const addPostFB = (payload) => {
  console.log(payload)
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "hamgallery"), payload);
    const post_data = { id:docRef.id, ...payload };
    console.log(post_data);
    dispatch(addPost(post_data));
  }
}

// export const addPostFB = (payload) => async (dispatch) => {
//   const docRef = await addDoc(collection(db, "hamgallery"), payload);
//   dispatch(addPost({ id: docRef.id, ...payload }));
// };

// [ DELETE ]
export const delPostFB = (payload) => async (dispatch, getState) => {
  const docRef = doc(db, "hamgallery", payload);
  console.log(docRef);
  await deleteDoc(docRef);
  const post_idx = getState().boardReducer.list.findIndex((value) => {
     console.log(value.id); // ???
     return value.id === payload;  // 
   });
  console.log(post_idx); // ????????? index?
  dispatch(deletePost(post_idx));
  dispatch(loadPostFB()); //=> ???????????? ???????????? ?????? ?????? ????????? ??????!
}

// [ UPDATE ]
export const updatePostFB = (payload, index) => async (dispatch) => {
  console.log(payload);
  console.log(payload.id);
  console.log(index);
  const docRef = doc(db, "hamgallery", payload.id);
  await updateDoc(docRef, {
    ineImg : payload.ineImg,
    ineText : payload.ineText
  });
  dispatch(updatePost({payload, index}));
};

/* REDUCER */
export default function postReducer(state = initialState, action = {}) {
  console.log(action)
  switch (action.type) {
    case LOAD_POST :
      return { ...state, list : action.payload}
    case ADD_POST :
    //   return {
    //     ...state,
    //     list: [...state.list, action.payload]
    // }
      return {
        ...state, list : [...state.list]
      }
    case DELETE_POST :
      return {
        ...state,
        list : state.list.filter((value, index) => {
          return (index !== action.payload);
        })
      };
    case UPDATE_POST :
      const dataUpdate = state.list.map((value, index) => {
        return index === Number(action.payload.index) ? action.payload.payload : value;
      })
      return { ...state, list : dataUpdate }
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