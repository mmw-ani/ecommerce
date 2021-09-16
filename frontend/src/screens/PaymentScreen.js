import React,{useState,useEffect} from 'react'
import {Form, Button,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../component/FormContainer'
import { savePaymentMethod} from '../actions/cartActions'

function PaymentScreen({history}) {
    

    const cart = useSelector(state=>state.cart)
    const {shippingAddress } = cart

    const [paymentMethod,setPaymentMethod] = useState('Paypal')


    const dispatch =useDispatch()
    if(!shippingAddress.address){
        history.push('/shipping')
    }
    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }   
    return (
        <FormContainer>
            <Form
                onSubmit={submitHandler}
            >
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                    <Form.Check
                        type='radio'
                        label='Paypal'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                    >
                        
                    </Form.Check></Col>
                </Form.Group>
                <Button type='submit' variant='primary' >Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
