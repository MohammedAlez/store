import { useEffect, useState } from 'react'
import { makeRequest } from './makeRequest';

export const useFetch = (url) => {
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([])

    useEffect(()=>{
        const fetchData=async()=>{
            if(url !== ' ' ) {
                try{
                    setLoading(true);
                    setError(false);
                    const res = await makeRequest.get(url);
                    setData(res.data.data)
                }catch{
                    setError(true);
                }
                setLoading(false);
            }
        }
        fetchData();
    },[url])


    return {error,data,loading}
}
