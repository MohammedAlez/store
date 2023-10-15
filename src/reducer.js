// import React from 'react'

const reducer=(state,action)=>{
    switch(action.type){
        case 'add': {
            // console.log(state)
            const i = state?.findIndex((i)=>i.id===action.item.id)
            // console.log(i)
            if(i!==-1){
                const updatedState = [...state]
                updatedState[i] = {...action.item}
                return updatedState
            }else{
                return [...state,{...action.item}]
            }
        }
        case 'remove':
            return [...state.filter((i)=>i.id!==action.item.id)]
        case 'update':{
            // console.log(action.item)
            const updatedState = state.map((e)=>{
                if(e.id===action.item.id){
                    return {...e,quantity:action?.item?.quantity}
                }else{
                    return e
                }
            })
            return updatedState
            }
        case 'reset' : {
            return [];
        }
        default : 
            return state
    }
}
export default reducer
