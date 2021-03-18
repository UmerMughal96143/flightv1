import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalDialog from "react-bootstrap/ModalDialog";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are u want to remove this Person {personForRemove.firstName}{" "}
          {personForRemove.lastName} ?
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col xs={6}>
                <button class="Back-btn" onClick={handleClose}>
                  Back
                </button>
            </Col>
            <Col xs={6}>
              <button
                class="Submit-to-checkout appointmentsummary"
                onClick={() => {
                  handleClose();
                  personRemoveHandler(personForRemove.id);
                }}
              >
                Remove
              </button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modall;
