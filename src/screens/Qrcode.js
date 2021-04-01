import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setStatusOfApplication } from '../actions/form';

const Qrcode = ({location}) => {
    const params = new URLSearchParams(location.search);
    let queryString = params.get("id");
    const dispatch = useDispatch();
    

    useEffect(() => {

        console.log(queryString)
        dispatch(setStatusOfApplication(queryString))
    },[])
    return (
        <div>
            Successfully Registered Qr Code
        </div>
    )
}

export default Qrcode
