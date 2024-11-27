import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Uhandler({setisUserAuthincated}){
    const location =useLocation();
    const navigate =useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('utoken')){
            setisUserAuthincated(true);
            if(
                location.pathname==='/'
            ){navigate('/userpage',{replace:false})}
        }
    },[location,navigate,setisUserAuthincated])
    return(null);
}