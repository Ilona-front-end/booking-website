import './App.css';
import Router from './routes/Router';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

function App() {
  return (
    <>
      <div>
        <Header />
        <Router />
        <Footer />
      </div>
    </>
  );
}

export default App;
