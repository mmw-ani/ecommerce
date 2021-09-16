import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button,Row,Col,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import {getUserDetails,updateUserProfile} from '../actions/userActions'
import { listorders } from '../actions/orderActions'

function ProfileScreen({history}) {

    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()
    
    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading,user} = userDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderList = useSelector(state => state.orderList)
    const { loading:loadingOrders,error:errorOrders,orders } = orderList

    useEffect(()=>{
        if(!userInfo) {
            history.push('/login')
        }else{
            if(!user|| !user.name || success || userInfo._id!=user._id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listorders())
            }
            else{
                setName(user.name)
                setUsername(user.username)
            }
        }
    },[dispatch,history,userInfo,user,success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password!=confirmPassword){
            setMessage('Passwords do not match')
        } 
        else{
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': username,
                'password': password
            }))
            setMessage('')
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>Profile</h2>
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
                        type='password'
                        placeholder='Enter Confirm password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders?(<Loader />)
                : errorOrders ? (<Message variant='danger'>{errorOrders}</Message>)
                :(
                    <Table striped responsive hover className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substr(0,10)}</td>
                                    <td><i className='fas fa-rupee-sign'></i>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substr(0,10) : (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                    <td>
                                        <Link to = {`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
