'use client'

import React, {useEffect, useState} from 'react'

const PaymentIframe = ({paymentUrl}) => {
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        if(paymentUrl){
            setIframeSrc(paymentUrl);
        }
         // Set up a listener for messages from the iframe
        const handleMessage = (event) => {
            if (event.origin !== 'https://pay.pesapal.com') return; // Check for trusted source
            console.log('Message from iframe:', event.data); // Handle the data
        };
    
        window.addEventListener('message', handleMessage);
    
        return () => {
            window.removeEventListener('message', handleMessage); // Cleanup on unmount
        };
    }, [paymentUrl])
    return (
    <div>
        {iframeSrc && <iframe title="Payment Iframe" src={iframeSrc} width="100%" height="500px"></iframe>}
    </div>
    )
}

export default PaymentIframe