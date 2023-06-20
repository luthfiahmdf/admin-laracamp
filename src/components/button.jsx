import { FaPen } from "react-icons/fa";
import PropTypes from "prop-types";
function ButtonComponents({ text, onClick, className, icons }) {
  ButtonComponents.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    icons: PropTypes.string,
    id: PropTypes.integer,
  };
  return (
    <div>
      <button
        className={`${className} lg:w-28 rounded-md p-2 flex flex-wrap justify-center items-center gap-2`}
        onClick={onClick}
      >
        {icons} {text}
      </button>
    </div>
  );
}

export default ButtonComponents;
