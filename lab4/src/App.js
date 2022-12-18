import QuestionnaireForm from './components/QuestionnaireForm';
import './App.css';

function App() {
  document.title = 'Lab #1';

  return (
    <div className='app'>
      <h1>Myers–Briggs Type Indicator result:</h1>
      <QuestionnaireForm
        className='questionnaireForm'
      />
    </div>
  );
}

export default App;
