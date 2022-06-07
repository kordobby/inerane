import { createSlice } from "@reduxjs/toolkit";
import { Action } from "history";

/* INIT */
const initialState = {
  list : [],
  loading : false,
  error : null
}

/* createSlice */
export const boardSlice = createSlice({
  name : 'boardReducer',
  initialState,
  reducers : {
    loadPost : ( state, payload ) => {
      console.log(payload);
      return {
        ...state, list : payload
      }
    },
    delPost : ( state, payload ) => {
      return {
        ...state,
        list : state.list.filter((value, index) => {
          return (index !== payload );
        })
      }
    },
    addPost : ( state, payload ) => {
      return {
        ...state,
        list : [ ...state.list, payload ]
      }
    },
    updatePost : ( state, payload ) => {
      const dataUpdate = state.list.map((value, index) => {
        return index === Number(payload.index) ? payload.payload : value;
      })
      return { ...state, list : dataUpdate }
    }
    }
  })

  export const { loadPost, delPost, addPost, updatePost } = boardSlice.actions;
  export default boardSlice.reducer;
