import { Formik } from 'formik';

const Form = ({
  className,
  children,
  initialValues = {},
  onSubmit,
  validate,
  enableReinitialize,
  validationSchema,
}) => {
  const formikProps = {
    initialValues,
    onSubmit,
    validate,
    validationSchema,
    enableReinitialize,
  };

  return (
    <Formik {...formikProps}>
      {(formik) => (
        <form
          className={className}
          onSubmit={formik.handleSubmit}
        >
          {children(formik)}
        </form>
      )}
    </Formik>
  );
};

export default Form;
