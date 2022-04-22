import classes from './ButtonGroup.module.css'

function Modal(props) {
  return (
    <div className={classes['btn-group']}>
      {props.children}
    </div>
  );
}
export default Modal;