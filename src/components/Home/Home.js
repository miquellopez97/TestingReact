import React from "react";
import useHttp from "../../hooks/useHttp";
import Card from "./Detail/Card";

function Home() {
  // const {isLoading, error, sendRequest: hotelsList} = useHttp();

  // const response = hotelsList(
  //     {
  //         url: 'https://daw-m07-uf4-pr01.herokuapp.com/api/v1/hotels',
  //         method: 'get'
  //     },
  // );

  const fakeData =[
    {
      _id: "6249b42d701c57de34f8b2a5",
      __v: 0,
      address: "C/Fake 11",
      city: "Barcelona",
      country: "Spain",
      name: "Hotel Test 1",
      stars: 4,
    },
    {
      _id: "624b0b9c509b341b4550686d",
      name: "Hotel Test 2",
      city: "Barcelona",
      country: "Spain",
      stars: 5,
      createdBy: "624b0ae3ea16f7cfeccd36b4",
      __v: 0,
      address: "C/Fake 22",
    },
    {
      _id: "624dd6b202d349156b8394b0",
      name: "AndorraFake",
      city: "AndorralaVella",
      country: "Andorra",
      address: "C/Fake 33",
      stars: 2,
      createdBy: "624b0ae3ea16f7cfeccd36b4",
      __v: 0,
    }
  ];


  return (
    <>
      <h1>Home</h1>
      <ul>
        {fakeData.map((el) => <Card name={el.name} city={el.city} country={el.country} stars={el.stars} address={el.address} key={el._id}/> )}
      </ul>
    </>
  );
}

export default Home;
