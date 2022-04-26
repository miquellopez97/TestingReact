function Card(props) {
    const {name, stars, country, city, address} = props;

    return (
        <li>
            <p>{name}</p>
            <img src={stars} alt="start"/>
            <p>{country}</p>
            <p>{city}</p>
            <p>{address}</p>
        </li>
    )
}

export default Card;