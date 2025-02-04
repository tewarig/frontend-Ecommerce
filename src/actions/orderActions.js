import axios from "axios"
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstant"


export const createOrder = (order) => async(dispatch,getState)=>{
    try{
        dispatch({type: CREATE_ORDER_REQUEST})
        const config = {
           headers:  {"Content-Type" : "application/json"}
        }
        const {data} = await axios.post('/api/v1/order/new', order, config)
        dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
    } 
    catch(err){
        dispatch({type: CREATE_ORDER_FAIL, payload: err.response.data.message})
    }
}     

export const myOrders = () => async(dispatch,getState)=>{
    try{
        dispatch({type: MY_ORDERS_REQUEST})
        const config = {
           headers:  {"Content-Type" : "application/json"}
        }
        const {data} = await axios.get('/api/v1/orders/me')
        dispatch({type: MY_ORDERS_SUCCESS, payload: data.orders})
    } 
    catch(err){
        dispatch({type: MY_ORDERS_FAIL, payload: err.response.data.message})
    }
}

export const orderDetails = (id) => async(dispatch,getState)=>{
    try{
        dispatch({type: ORDER_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/order/${id}`)
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.order})
    }
    catch(err){
        dispatch({type: ORDER_DETAILS_FAIL, payload: err.response.data.message})
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}