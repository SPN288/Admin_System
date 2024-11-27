import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Mhandler({setisManagerAuthincated}){
    const location =useLocation();
    const navigate =useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('mtoken')){
            setisManagerAuthincated(true);
            if(
                location.pathname==='/'
            ){navigate('/managerpage',{replace:false})}
        }
    },[location,navigate,setisManagerAuthincated])
    return(null);
}