import star from "../../../../public"

function Card(props) {
    const {name, stars, country, city, address} = props;

    return (
        <li>
            <p>{name}</p>
            <img src={star} alt="start"/>
            <p>{country}</p>
            <p>{city}</p>
            <p>{address}</p>
        </li>
    )
}

export default Card;