import {Routes, Route} from 'react-router-dom';
import Header from './components/header/header';
import Orders from './pages/orders';
import About from './pages/about/about';
import CreateOrder from './pages/createOrder/createOrder';
import Order from './pages/order/order';
import NotFound from './pages/NotFound';

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={''} exact element={<About/>} />
        <Route path={'/orders'} exact element={<Orders/>} />
        <Route path={'/create'} exact element={<CreateOrder/>} />
        <Route path={'/order/:id'} exact element={<Order/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </div>
  );
}

export default App;
