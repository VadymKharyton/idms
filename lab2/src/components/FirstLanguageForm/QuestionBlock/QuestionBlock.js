const QuestionBlock = ({
  question,
  left,
  right,
  handleSelectAnswer,
}) => (
  <div className='questionBlock'>
    <h1>{question}</h1>
    <div className='buttons'>
      {[left, right].map(({id, answer}) => (
        <button
          type='button'
          onClick={() => handleSelectAnswer(id)}
        >
          {answer}
        </button>
      ))
      }
    </div>
  </div>
);

export default QuestionBlock;