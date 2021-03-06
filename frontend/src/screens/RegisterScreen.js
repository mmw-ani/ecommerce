import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../component/Loader'
import Message from '../component/Message'
import FormContainer from '../component/FormContainer'
import {register} from '../actions/userActions'

function RegisterScreen({location,history}) {


    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()
    
    const userRegister = useSelector(state=>state.userRegister)
    const {error,loading,userInfo} = userRegister
    const redirect = location.search ? location.search.split('=')[1]:'/'
    useEffect(()=>{
        if(userInfo) {
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password!=confirmPassword){
            setMessage('Passwords do not match')
        } 
        else{
        dispatch(register(name,username,password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        required
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='username'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        required
                        type='email'
                        placeholder='Enter email'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control 
                        required
                        type='password'
                        placeholder='Enter Confirm password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign up
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
