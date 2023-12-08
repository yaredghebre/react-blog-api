import { useState } from 'react';

// Router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Posts from './pages/Posts';
import AddNewPost from './pages/AddNewPost';
import About from './pages/About';
import SinglePost from './pages/SinglePost';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="ms_wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:slug" element={<SinglePost />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-new-post" element={<AddNewPost />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
