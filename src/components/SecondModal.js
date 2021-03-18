import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function SecondModal({ showSecondModal }) {
  const [show, setShow] = useState(showSecondModal);
  const { personForRemove } = useSelector((state) => state.Form);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {personForRemove.firstName} {" "} {personForRemove.lastName}{" "} has been
          removed .
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SecondModal;
