import { useState } from "react";
import Form from "../Form";
import './QuestionnaireForm.css';
import questions from './questions.json';
import {types as personalityTypes} from './personalityTypes';

const algorythm = (answers) => {
  let countOfA = 0;
  let countOfB = 0;
  let personalityDichotomy = '';
  let count = 0;

  for (const answer of Object.values(answers)) {
    if (answer === 'a') {
      countOfA++;
    } else {
      countOfB++;
    }
    count++;

    switch (count) {
      case 5:
        if (countOfA > countOfB) {
          personalityDichotomy += 'E'
        } else {
          personalityDichotomy += 'I'
        }
        break;
      case 10:
        if (countOfA > countOfB) {
          personalityDichotomy += 'S'
        } else {
          personalityDichotomy += 'N'
        }
        break;
      case 15:
        if (countOfA > countOfB) {
          personalityDichotomy += 'T'
        } else {
          personalityDichotomy += 'F'
        }
        break;
      case 20:
        if (countOfA > countOfB) {
          personalityDichotomy += 'J'
        } else {
          personalityDichotomy += 'P'
        }
        break;
      default:
        continue;
    }
  }

  return personalityDichotomy;
};

const QuestionnaireForm = ({ className }) => {
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);
  const [personalityDichotomy, setPersonalityDichotomy] = useState('');

  const personality = personalityTypes.find(({value}) => value === personalityDichotomy);

  const handleSubmit = (values) => {
    const value = algorythm(values);
    setPersonalityDichotomy(value);
    setWasFormSubmitted(true);
  };

  const reset = () => {
    setPersonalityDichotomy(false);
    setWasFormSubmitted(false);
  };

  return (
    <div className={className ?? ''}>
      {wasFormSubmitted && personality
        ? (
          <div className="finalMessageBlock">
            <h3
              className={'finalMessage success'}
            >
              {`Your personality type is: ${personality.name}`}
            </h3>
            <h3
              className={'finalMessage success'}
            >
              {`Description: ${personality.description}`}
            </h3>
            {/* <p><img src={personality.img} alt={personality.name}/></p> */}
            <button
              type="button"
              onClick={reset}
              className='button back'
            >Back to questions</button>
          </div>
        )
        : (
          <Form
            // initialValues={initialValues}
            onSubmit={handleSubmit}
            className='form'
          >
            {({ /*values,*/ setFieldValue, resetForm }) => {
              const handleChangeRadio = (field, value) => {
                setFieldValue(field, value);
              };

              return (
                <>
                  {
                    questions.map(({ a, b }, index) => (
                      <div
                        key={index}
                        className="questionBlock"
                      >
                        <p className="question">{`Question #${index + 1}. Choose what suits you best:`}</p>
                        <div className="answers">
                          <label className="answer">
                            <input
                              type='radio'
                              name={`question${index}`}
                              // checked={values[name]}
                              onChange={() => handleChangeRadio(`question${index}`, 'a')}
                            />
                            {a}
                          </label>
                          <label className="answer">
                            <input
                              type='radio'
                              name={`question${index}`}
                              // checked={!values[name]}
                              onChange={() => handleChangeRadio(`question${index}`, 'b')}
                            />
                            {b}
                          </label>
                        </div>
                      </div>
                    ))
                  }

                  <div className="formButtons">
                    <button
                      type='reset'
                      onClick={resetForm}
                      className='button reset'
                    >
                      Reset values
                    </button>
                    <button
                      type='submit'
                      className='button submit'
                    >
                      Check result
                    </button>
                  </div>
                </>
              );
            }}
          </Form >
        )}
    </div>
  )
};

export default QuestionnaireForm;