import "./alert-message.css";

function AlertMessage({
  isWarning,
  isSuccess,
  isFailure,
  isInformation,
  alertTitle,
  alertMsg
}) {
  return (<>
  {isWarning || isSuccess || isFailure || isInformation ? <div className={`${isWarning ? "alm-alert-message-section" : ""} 
    ${isSuccess ? "alm-success-message-section" : ""} 
    ${isFailure ? "alm-failure-message-section" : ""}
    ${isInformation ? "alm-information-message-section" : ''}`}>
    <div className="alm-alert-message">
      <div className={`alm-alert-icon ${isSuccess && "alm-success-icon"}
        ${isWarning ? "alm-alert-icon" : ''}
        ${isFailure ? "alm-failure-icon" : ''}
        ${isInformation ? "alm-infomation-icon" : ''}`}>
        <i className={`${isSuccess ? "fa fa-check modal-success-icon" : ''}
          ${isWarning ? "fas fa-exclamation" : ''}
          ${isFailure ? "fas fa-times" : ''}
          ${isInformation ? "fas fa-info" : ''}`}></i>
      </div>
      <div className={`${isSuccess ? "alm-success-arrow" : ''}
        ${isWarning ? "alm-alert-arrow" : ''}
        ${isFailure ? "alm-failure-arrow" : ''}
        ${isInformation ? "alm-information-arrow" : ''}`} />
      <div className={`${isSuccess ? "alm-success-msg" : ''}
        ${isWarning ? "alm-alert-msg" : ''}
        ${isFailure ? "alm-failure-msg" : ''}
        ${isInformation ? "alm-information-msg" : ''}`}>
        <span className="alm-warning">{alertTitle}</span>
        <span className="alm-warning-msg">{alertMsg}</span>
      </div>
    </div>
  </div> : null}
  </>)
}

export default AlertMessage;