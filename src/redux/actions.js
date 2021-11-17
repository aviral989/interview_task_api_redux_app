import {GET_DATA_REQUEST,GET_DATA_SUCCESS,GET_DATA_FAILED} from './actiontypes'
import axios from 'axios';
export function getDataRequest() {
    return {
       type: GET_DATA_REQUEST,
    }
 }
 export function getDataSuccess(data) {
    return {
       type: GET_DATA_SUCCESS,
       payload:data 
    }
 }
 export function getDataFailed(error) {
    return {
       type: GET_DATA_FAILED,
       payload:error
    }
 }

 export const getData = () =>{
     return (dispatch) =>{
         dispatch(getDataRequest())
        axios.get('https://api.coincap.io/v2/assets')
        .then(response => {
            const coinData = response.data.data
            dispatch(getDataSuccess(coinData))
        })
        .catch(errormsg =>{
            const error = errormsg.message
            dispatch(getDataFailed(error))
        } )
     }
 }