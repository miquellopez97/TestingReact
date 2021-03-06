import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import classes from './Login.module.css';
import InputUtils from '../Utils/Input'

function Login() {

  const [prevPriceInput, setPrevPriceInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [priceIsValid, setPriceIsValid] = useState(null);

  const [prevStockInput, setPrevStockInput] = useState('');
  const [stockInput, setStockInput] = useState('');
  const [stockIsValid, setStockIsValid] = useState(null);
  
  const [prevDescInput, setPrevDescInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [descIsValid, setDescIsValid] = useState(null);

  
  useEffect(() => {
    if (prevPriceInput === priceInput) {
      return;
    }
    const timer = setTimeout(() => {
      console.log('UseEffect running');
      setPrevPriceInput(priceInput);
      setPriceIsValid(priceInput.trim() > 5);
    }, 500);

    return () => {
      console.log('Effect cleanup!');
      clearTimeout(timer);
    }
  }, [priceInput, prevPriceInput]);

  const login = (event) => {
    event.preventDefault();

    const price = priceInput;
    const stock = stockInput;
    const desc = descInput;

    console.log(price, stock, desc);
    // TODO: Request to Login
    setPriceInput('');
    setStockInput('');
    setDescInput('')
  };
  
  const priceOnChangeHandler = (e) => setPriceInput(e.target.value);

  return (
    <form className={classes.form} onSubmit={login}>
      <InputUtils />
      <textarea
        onChange={(e) => setDescInput(e.target.value)}
        value={descInput}
        className={descIsValid === false ? classes.invalid : ''}
      />
      <input
        onChange={priceOnChangeHandler}
        value={priceInput}
        className={priceIsValid === false ? classes.invalid : ''}
      />
      <input
      onChange={(e) => setStockInput(e.target.value)}
      value={stockInput}
      className={stockIsValid === false ? classes.invalid : ''}
    />
      <Button type="submit">Login</Button>
    </form>
  );
}
export default Login;

/*

------RESUM DEL HOOK useEffect-----

---UseEffect SENSE return---
--PRIMERA OPCI??--
useEffect(() => {
  console.log('Effect running');
  -- Aquest codi s'executar??:
    1. Quan es carregui el component per primer cop.
    2. Per cada canvi de qualsevol state del component.
  -- Quasi mai es fa servir.
});

--SEGONA OPCI??--
useEffect(() => {
  console.log('Effect running');
  -- Aquest codi s'executar?? quan es carregui el component per primer cop.
}, []);

--TERCERA OPCI??--
useEffect(() => {
  console.log('Effect running');
  -- Aquest codi s'executar??:
    1. Quan es carregui el component per primer cop.
    2. Cada cop que es modifiqui el state nameInput o el pwdInput.
}, [nameInput, pwdInput]);


---UseEffect AMB return---
--PRIMERA OPCI??--
useEffect(() => {
  console.log('Effect running!');

  return () => {
    console.log('Effect cleanup!');
    -- Aquest codi s'executar?? abans d'executar el codi del useEffect , ??s a dir, el console.log('Effect running!') . Per?? no s'executar?? al carregar el component per primer cop.
  }
}, [nameInput, pwdInput]);

--SEGONA OPCI??--
useEffect(() => {
  console.log('Effect running!');

  return () => {
    console.log('Effect cleanup!');
    -- Aquest codi s'executar?? nom??s quan el component desapareix del DOM.
  }
}, []);
 */