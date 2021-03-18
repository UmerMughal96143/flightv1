import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function SecondModal({ showSecondModal }) {
  const [show, setShow] = useState(showSecondModal);
  console.log("🚀 ~ file: SecondModal.js ~ line 7 ~ SecondModal ~ show", show);
  const { personForRemove } = useSelector((state) => state.Form);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Body>
          {personForRemove.firstName} {" "} {personForRemove.lastName}{" "} has been
          removed .
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SecondModal;
