import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import RootLayout from './components/RootLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
