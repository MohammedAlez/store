
const userReducer = (state,action) => {
    switch(action.type){
        case 'ADD_USER' : {
            if(action.save){
                localStorage.setItem('user',JSON.stringify(action.user))
            }
            return action.user
        }
        case 'UPDATE_USER' :{
            if(localStorage.getItem('user')){
                localStorage.setItem('user',JSON.stringify(action.user))
            }
            return action.user
        }
        case 'REMOVE_USER' :{
            localStorage.removeItem('user')
            return {}
        }
        default : return state
    }
}

export default userReducer