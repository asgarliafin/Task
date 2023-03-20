import {Routes, Route} from 'react-router-dom';
import { Header } from 'components';
import {About, Orders, Order, CreateOrder, NotFound} from 'pages';

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={''} exact element={<About/>} />
        <Route path={'/orders'} exact element={<Orders/>} />
        <Route path={'/order'} exact element={<Order/>} />
        <Route path={'/create'} exact element={<CreateOrder/>} />
        <Route path={'/order/:id'} exact element={<Order/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </div>
  );
}

export default App;
