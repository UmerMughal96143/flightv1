import React, { useEffect } from 'react'
import Iframe from 'react-iframe'
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
            <Iframe url={paymentApiData.redirect_url}
        width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
        </div>
    )
}

export default Qrcode
