import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStatusOfApplication } from '../actions/form';

const Qrcode = ({location}) => {
    const params = new URLSearchParams(location.search);
    let queryString = params.get("id");
    const dispatch = useDispatch();
    const {paymentApiData} = useSelector((s) => s.Form) 
    

    useEffect(() => {

        console.log(queryString)
        dispatch(setStatusOfApplication(queryString))
    },[])
    return (
        <div>
            <iframe src={paymentApiData.redirect_url}></iframe>
        </div>
    )
}

export default Qrcode
