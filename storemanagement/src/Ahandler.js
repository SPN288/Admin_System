import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Ahandler({setisAdminAuthincated}){
    const location =useLocation();
    const navigate =useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('atoken')){
            setisAdminAuthincated(true);
            if(
                location.pathname==='/'
            ){navigate('/adminpage',{replace:false})}
        }
    },[location,navigate,setisAdminAuthincated])
    return(null);
}