import { useState, useContext, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import Card from "./Detail/Card";
import userData from "../../context/UserContext";

function Home() {
  const { isLoading, error, sendRequest: hotelsList } = useHttp();
  const [content, setContent] = useState(null);

  function updateContent(data) {
    setContent(data.body)
  }

  const actualUser = useContext(userData);

  useEffect(() => {
    hotelsList(
      {
        url: 'https://daw-m07-uf4-pr01.herokuapp.com/api/v1/hotels',
        method: 'get'
      },
  
      updateContent
    );
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
      <p>El user actual es: {actualUser.token}</p>
    </>
  );
}

export default Home;
