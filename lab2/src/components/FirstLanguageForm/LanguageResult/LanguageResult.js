const LanguageResult = ({
  description,
  name,
  handeReset,
  logo,
}) => (
  <div className='result'>
    {/* <img className='logo' src={logo} alt={name}/> */}
    <h2>Result: Language - {name}</h2>
    <pre>{description}</pre>
    <button
      type='button'
      onClick={handeReset}
      className='retry'
    >
      Try again
    </button>
  </div>
);

export default LanguageResult;