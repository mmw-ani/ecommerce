import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container className="py-3">
          <main>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
           <Route path="/shipping" component={ShippingScreen} /> 
            <Route path="/product/:id" component={ProductScreen} /> 
            <Route path="/cart/:id?" component={CartScreen} /> 
          </main>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
