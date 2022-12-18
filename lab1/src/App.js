import CreditForm from './components/CreditForm';
import './App.css';

function App() {
  return (
    <div className='app'>
      <h1>Перевірте можливість отримання кредиту</h1>
      <CreditForm
        className='crereditForm'
      />
    </div>
  );
}

export default App;
