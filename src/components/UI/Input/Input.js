import { useEffect, useState } from 'react';
import classes from './Input.module.css';

function Input(props) {
  const [prevPropsValue, setPrevPropsValue] = useState('');

  useEffect(() => {
    if (prevPropsValue === props.value) {
      return;
    }
    const timer = setTimeout(() => {
      setPrevPropsValue(props.value);
      props.onChangeValidity();
    }, 500);

    return () => clearTimeout(timer);
  }, [props, prevPropsValue]);

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        className={`
          ${classes.input} 
          ${props.isValid === false ? classes.invalid : ''} 
          ${props.className}`}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
}
export default Input;