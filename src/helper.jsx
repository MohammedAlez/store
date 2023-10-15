import { Navigate } from "react-router";
import { useContextApi } from "./Components/Context"


export const Protector=({children})=>{
    const {user} = useContextApi();
    if(user.username){
        return <Navigate to='/'/>
    }else{
        return children
    }
}
export const AccountProtector=({children})=>{
    const {user} = useContextApi();
    if(user.username){
        return children
    }else{
        return <Navigate to='/login' />
    }
}