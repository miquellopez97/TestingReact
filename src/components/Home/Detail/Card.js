import star from '../../../assets/Estrella.png';

function Card(props) {
    const {name, country, nstar, city, address} = props;

    const myStyle={
        width:'12px',
        height:'12px'
        };

    return (
        <li>
            <p>{name}</p>
            <p>{nstar}<img src={star} alt="start" style={myStyle}/></p>
            <p>{country}</p>
            <p>{city}</p>
            <p>{address}</p>
        </li>
    )
}

export default Card;