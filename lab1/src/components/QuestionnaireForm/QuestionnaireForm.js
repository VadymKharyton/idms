import { useState } from "react";
import Form from "../Form";
import './QuestionnaireForm.css';

const QuestionnaireForm = ({ className }) => {
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);
  const [canBeApplied, setCanBeApplied] = useState(false);
  const message = canBeApplied
    ? 'Congratulations! You CAN be applied to this position!'
    : 'Unfortunetely, You CAN NOT be applied to this position!';

  const initialValues = {
    hasDegree: false,
    hasPassedCourses: false,
    hasExperience: false,
  };

  const handleSubmit = (values) => {
    const {
      hasDegree,
      hasPassedCourses,
      hasExperience,
    } = values;
    const res = (hasDegree || hasPassedCourses) && hasExperience;
    setCanBeApplied(res);
    setWasFormSubmitted(true);
  };

  const reset = () => {
    setCanBeApplied(false);
    setWasFormSubmitted(false);
  };

  return (
    <div className={className ?? ''}>
      {wasFormSubmitted
        ? (
          <div className="finalMessageBlock">
            <h3
              className={`finalMessage ${canBeApplied ? 'success' : 'error'}`}
            >
              {message}
            </h3>
            <button
              type="button"
              onClick={reset}
              className='button back'
            >Back to questions</button>
          </div>
        )
        : (
          <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            className='form'
          >
            {({ values, setFieldValue, resetForm }) => {
              const handleChangeRadio = (field, value) => {
                setFieldValue(field, value);
              };

              const fields = [
                {
                  title: 'Has Bachelor degree in Computer Science?',
                  name: 'hasDegree',
                },
                !values.hasDegree && {
                  title: 'Has passed Computer Science courses?',
                  name: 'hasPassedCourses',
                },
                {
                  title: 'Has 2 years experience in this profile?',
                  name: 'hasExperience',
                },
              ].filter(Boolean);

              return (
                <>
                  {
                    fields.map(({ title, name }) => (
                      <div
                        key={name}
                        className="questionBlock"
                      >
                        <p className="question">{title}</p>
                        <div className="answers">
                          <label className="answer">
                            <input
                              type='radio'
                              name={name}
                              checked={values[name]}
                              onChange={() => handleChangeRadio(name, true)}
                            />
                            YES
                          </label>
                          <label className="answer">
                            <input
                              type='radio'
                              name={name}
                              checked={!values[name]}
                              onChange={() => handleChangeRadio(name, false)}
                            />
                            NO
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