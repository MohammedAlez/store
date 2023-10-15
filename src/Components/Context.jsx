import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import reducer from '../reducer'
import userReducer from '../userReducer';

const context = createContext(null);
const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

export const Context = ({children}) => {
    const [cartItems,dispatch] = useReducer(reducer,initialState);
    const [user,dispatchUser] = useReducer(userReducer,initialUser);
    const [favorite,setFavorite] = useState([])
    const handleFavList=(item,isFav)=>{
        if(isFav){
            const i = favorite.findIndex((i)=>i.id===item.id)
            if(i === -1){
                setFavorite(prev=>([
                    ...prev,item
                ]))
            }
        }else{
            setFavorite(favorite.filter((i)=>i.id!==item.id))
        }
    }
    useEffect(()=>{
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
    },[cartItems])

    return (
        <context.Provider value={{cartItems,dispatch,user,dispatchUser,favorite,handleFavList}}>
            {children}
        </context.Provider>
    )
}

export const useContextApi=()=>{
    const values = useContext(context);
    return {...values}
}
