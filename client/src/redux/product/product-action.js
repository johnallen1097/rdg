import axios from "axios";
import { ProductActionTypes } from "./product-types";

export const getProductDetail = (id) => {
    const request = axios
        .get(`/api/product/${id}`)
        .then(res => res.data);

        return {
            type:ProductActionTypes.GET_PRODUCT_DETAIL,
            payload:request,
        }
        
}

export const clearProductDetail = () => {
    return{
        type:ProductActionTypes.CLEAR_PRODUCT_DETAIL,
        payload:[]
    }
}


export const getProductsToHome = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/product/home')
        dispatch({
            type: ProductActionTypes.GET_PRODUCT_TO_HOME,
             payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductActionTypes.ERROR_PRODUCT,
            payload: error.response && error.response.data.error ? error.response.data.error : error.message
        })
    }
}

export const getProductsToShop = (skip,limit,filters =[], previousState=[]) => {
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`/api/product/shop`,data)
            .then(res => {
                let newState = [
                    ...previousState,
                    ...res.data.articles
                ];
                return {
                    size: res.data.size,
                    articles: newState
                }
            });


            return{
                type:ProductActionTypes.GET_PRODUCTS_TO_SHOP,
                payload: request
            }
}


export const addProduct = (dataToSubmit)  => {

    const request = axios
        .post('/api/product',dataToSubmit)
        .then(res => res.data)
        // .catch(err => {
        //     err.response.data.error.split(',');
        // });

        return {
            type: ProductActionTypes.ADD_PRODUCT,
            payload: request
        }
    
}




export const getProducts = () => {
    const request = 
        axios.get('/api/product').then(res => res.data);
    return {
        type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
        payload: request
    }
}


export const deleteProduct = (data) => dispatch => {
    axios
        .delete(`/api/product/${data}`)
        .then(res=>
            dispatch({
                type: ProductActionTypes.DELETE_SUCCESS,
                payload: res.data,
            })
        )
        .catch(err =>
            dispatch({
                type: ProductActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
}

export const getCollections = () => {
    const request = axios.get('/api/collection?select=name')
        .then(res => res.data);
    return {
        type: ProductActionTypes.GET_COLLECTIONS,
        payload: request
    }
        
}



export const failedAction = (data) => dispatch => {
    // data.forEach(error => dispatch(setAlert(error,'danger',5000)))
}