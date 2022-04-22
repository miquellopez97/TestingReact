import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import ButtonGroup from '../Button/ButtonGroup';
import Button from '../Button/Button';
import classes from './Modal.module.css'

function Modal(props) {
  const showModal = () => {
    return (
      <div className={classes.modal}>
        {props.children}
        <ButtonGroup>
          {
            props.confirmModal ? 
            <>
              <Button onClick={props.onClose}>Cancel</Button>
              <Button className={classes['remove-btn']} onClick={props.onConfirm}>Confirm</Button>
            </> :
            <Button onClick={props.onClose}>Close</Button>
          }
        </ButtonGroup>
      </div>
    );
  }

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(showModal(), document.getElementById('overlay-root'))}
    </>
  );
}
export default Modal;