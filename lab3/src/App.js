import QuestionnaireForm from './components/QuestionnaireForm';
import './App.css';

function App() {
  document.title = 'Lab #1';

  return (
    <div className='app'>
      <h1>Which type of transport will be the best for your trip?</h1>
      <QuestionnaireForm
        className='questionnaireForm'
      />
    </div>
  );
}

export default App;
