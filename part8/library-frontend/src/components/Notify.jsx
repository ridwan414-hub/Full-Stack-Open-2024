import { PropTypes } from 'prop-types';

const Notify = ({
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
}) => {
  if (!errorMessage && !successMessage) {
    return null;
  }
  setTimeout(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, 10000);
  return (
    <div
      className={`${
        errorMessage
          ? 'bg-red-100 border-red-400 text-red-700'
          : 'bg-green-100 border-green-400 text-green-700'
      } border  px-4 py-3 rounded relative`}
      role="alert"
    >
      <strong className="font-bold">{errorMessage || successMessage}</strong>
    </div>
  );
};
Notify.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
};

export default Notify;
