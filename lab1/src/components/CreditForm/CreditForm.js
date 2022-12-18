import { useState } from "react";
import Form from "../Form";
import './CreditForm.css';

const CreditForm = ({ className }) => {
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);
  const [canGetLoan, setCanGetLoan] = useState(false);
  const message = canGetLoan
    ? 'Ви можете оформити кредит'
    : 'Ви не можете оформити кредит';

  const initialValues = {
    isSpecialtyMatch: false,
    ageLess45: false,
    hasSpecialtyExperience: false,
  };

  const handleSubmit = (values) => {
    const {
      isSpecialtyMatch,
      ageLess45,
      hasSpecialtyExperience,
    } = values;
    const canGetLoanNew = (isSpecialtyMatch || ageLess45) && hasSpecialtyExperience;
    setCanGetLoan(canGetLoanNew);
    setWasFormSubmitted(true);
  };

  const reset = () => {
    setCanGetLoan(false);
    setWasFormSubmitted(false);
  };

  return (
    <div className={className ?? ''}>
      {wasFormSubmitted
        ? (
          <div className="finalMessageBlock">
            <h3
              className={`finalMessage ${canGetLoan ? 'success' : 'error'}`}
            >
              {message}
            </h3>
            <button
              type="button"
              onClick={reset}
              className='button back'
            >Назад</button>
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
                  title: 'Чи навчались ви у ВНЗ за цією спеціальністю?',
                  name: 'isSpecialtyMatch',
                },
                !values.isSpecialtyMatch && {
                  title: 'Ваш вік менше 45?',
                  name: 'ageLess45',
                },
                {
                  title: 'Чи маєте досвід роботи за даною спеціальністю?',
                  name: 'hasSpecialtyExperience',
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
                            Так
                          </label>
                          <label className="answer">
                            <input
                              type='radio'
                              name={name}
                              checked={!values[name]}
                              onChange={() => handleChangeRadio(name, false)}
                            />
                            Ні
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
                      Reset
                    </button>
                    <button
                      type='submit'
                      className='button submit'
                    >
                      Submit
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

export default CreditForm;