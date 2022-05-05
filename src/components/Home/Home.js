import { useState, useContext, useEffect } from "react";
import Card from "./Detail/Card";
import userData from "../../context/UserContext";
import axios from "axios";


function Home() {
  const [content, setContent] = useState(null);

  const actualUser = useContext(userData);

  useEffect(() => {
    axios
      .get('https://daw-m07-uf4-pr01.herokuapp.com/api/v1/hotels')
      .then(res => {
        setContent(res.data.body);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h1>Home</h1>
      <ul>
        {content &&
        content.map((el) =>
          <Card
            name={el.name}
            city={el.city}
            country={el.country}
            nstar={el.stars}
            address={el.address}
            key={el._id}
          />
        )}
      </ul>
      <p>El user actual es: {actualUser.getToken}</p>
    </>
  );
}

export default Home;
