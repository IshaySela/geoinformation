import './App.css';
import { Header } from './components/Header';
import { PoisMap } from './components/PoisMap';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <div>
        <PoisMap />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
