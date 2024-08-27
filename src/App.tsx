import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Uncontrolled from './pages/Uncontrolled';
import ReactHookForm from './pages/ReactHookForm';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled" element={<Uncontrolled/>} />
      <Route path="/hook" element={<ReactHookForm />} />
    </Routes>

    </>
  );
}

export default App;
