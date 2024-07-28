import { PropTypes } from 'prop-types';
import BookFormModal from './BookFormModal';

const NewBook = (props) => {
  if (!props.setIsModalOpen) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      {props.isModalOpen && (
        <BookFormModal
          setError={props.setError}
          closeModal={() => props.setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
NewBook.propTypes = {
  setError: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
export default NewBook;
