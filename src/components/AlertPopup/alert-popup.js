import { Button, Modal } from "react-bootstrap";
import "./alert-popup.css";

function AlertPopup({
  openStatus,
  alertObj,
  changeOpenStatus,
  saveAction,
  cancelAction,
  buttonOrder
}) {
  return <Modal
    show={openStatus}
    onHide={changeOpenStatus}
    backdrop="static"
    size="sm"
    keyboard={false}
    dialogClassName="ap-alert-popup-modal">
    <Modal.Body className="ap-body">
      <div className="ap-close-section">
        <i role="button" className="fa fa-times" onClick={changeOpenStatus}/>
      </div>
      {alertObj.icon ? <i role="button" style={{color: alertObj.iconColor}} 
        className={`ap-action-icon ${alertObj.icon}`} /> : null}
      {alertObj.title? <div className="ap-alert-title">{alertObj.title}</div> : null}
      {alertObj.message ? <div className="ap-alert-messg">{alertObj.message}</div> : null}
      <div className="ap-submit-section">
        {alertObj.submitButtton ? <Button type="button" className="his-btn ap-action-button"
          style={ buttonOrder === -1? {order: 1, marginRight: '5px'}: {marginRight: '0px'}}
          onClick={saveAction}>
          {alertObj.submitButtton}
        </Button> : null}
        {alertObj.cancelButton ? <Button type="button" className="his-btn ap-cancel-button"
          style={buttonOrder === -1? {order: 2, marginRight: '0px'}: {marginRight: '5px'}}
          onClick={cancelAction}>
          {alertObj.cancelButton}
        </Button> : null}
      </div>
    </Modal.Body>
  </Modal>
}

export default AlertPopup;