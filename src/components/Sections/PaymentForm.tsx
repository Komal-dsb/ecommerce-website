import {useState} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { toast } from 'sonner'


function PaymentForm() {

    const stripe = useStripe()
    const elements = useElements()
    const [loading,setLoading] = useState(false)

    const handleSubmit = async(e:any)=>{
            e.preventDefault();
            setLoading(true);

        // 1. call your supabase function to crate a paymentIntent
        const res = await fetch("https://YOUR-SUPABASE-URL/functions/v1/create-payment-intent", {
      method: "POST",
    });

    const {client_secret} = await res.json();

    // 2. Confirm the card payment using stripe.js
    const result = await stripe?.confirmCardPayment(client_secret,{
        payment_method: {
            card: elements?.getElement(CardElement)!
        }
    })
    if(result?.error){
        toast.error(`payment failed : ${result.error.message}`)
    }  else if (result?.paymentIntent?.status === "succeeded"){
                toast.success("Payment Successful🎉")
    }
            setLoading(false)
    }

  return (
    <form onSubmit={handleSubmit}>
        <CardElement />
       <Button type='submit' disabled={!stripe || loading}>
        {loading ? "Processing" : "Pay"}

       </Button>
    </form>
  )
}

export default PaymentForm