import "../styles/card.css";

type CardProps = Readonly<{
  name: string;
  image: string;
  desc:string;
}>;


function Card({ name,image,desc}: CardProps) {
    return (
        <div className="card-doctor">
            <div className="doctor-container">
                <img className="doctor_images" src={image} alt="doctor" />
                <h4><b>{name}</b></h4>
                <p>{desc}</p>
                <button className="doctor-details-button" type="submit">Discover</button>   
            </div>
        </div>
    );
}

export default Card;