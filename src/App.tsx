import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Uncontrolled from './pages/Uncontrolled';
import ReactHookForm from './pages/ReactHookForm';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div id="root" className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled" element={<Uncontrolled/>} />
      <Route path="/hook" element={<ReactHookForm />} />
    </Routes>
    </main>
     <Footer/>
    </div>
  );
}

export default App;
