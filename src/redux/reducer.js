import React from 'react';	
import {GET_DATA_REQUEST,GET_DATA_SUCCESS,GET_DATA_FAILED} from './actiontypes'
 
const intitialState = {
     data:[],
     loading:false,
     errorMessage:''
 }
function reducer(state = intitialState, action){
console.log("working",action)
switch (action.type) {
    case GET_DATA_REQUEST:
    return {
      loading:true
    };
    case GET_DATA_SUCCESS:
        console.log("payload",action)
    return {
        loading:false,
        data:action.payload
    };
    case GET_DATA_FAILED:
      return {
        loading:false,
        errorMessage:action.payload
      };
  }
}
 
export default reducer;