import QuestionnaireForm from './components/QuestionnaireForm';
import './App.css';

function App() {
  document.title = 'Lab #1';

  return (
    <div className='app'>
      <h1>Do you have a possibility to be applied to this position?</h1>
      <QuestionnaireForm
        className='questionnaireForm'
      />
    </div>
  );
}

export default App;
