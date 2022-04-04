import classes from "./Modal.module.css";

const Modal = (props) => {
  const { setIsModalOpen } = props;
  const { Overlay, Modal } = classes;

  return (
    <div className={Overlay}>
      <div className={Modal}>
        <h4 className="mt-4">You must sign in first</h4>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(false)}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default Modal;
