import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function Modall({ showModal, closeModal, personRemoveHandler }) {
  const [show, setShow] = useState(showModal);
  const { personForRemove } = useSelector((state) => state.Form);

  const handleClose = () => {
    setShow(false);
    closeModal();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are u want to remove this Person {personForRemove.firstName}{" "}
          {personForRemove.lastName} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              personRemoveHandler(personForRemove.id);
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modall;
