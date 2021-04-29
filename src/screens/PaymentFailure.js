import React, { useEffect } from 'react'

const PaymentFailure = ({history}) => {

    useEffect(() => {

        history.push('/paymentdetails')

    },[])
    return (
        <div>
            
        </div>
    )
}

export default PaymentFailure
