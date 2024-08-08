import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { fetchProfile, loadTokens } from "../redux/features/user/userSlice";

const useAppInitializer = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadTokens());
        const token = localStorage.getItem('access');
        if(token){
            dispatch(fetchProfile(token));
        }
    },[dispatch])
  }

export default useAppInitializer