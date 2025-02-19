import "../styles/card.css";

type CardProps = Readonly<{
  name: string;
  email: string;
  phone: string;
  image: string;
  onclick:()=>void;
}>;


function Card({ name, email, phone, image, onclick }: CardProps) {
    return (
        <div className="card-doctor">
            <div className="doctor-container">
                <img className="doctor_images" src={image} alt="doctor" />
                <h4><b>{name}</b></h4>
                <p>{email}</p>
                <p>{phone}</p>
                <button className="doctor-details-button" type="submit" onClick={()=>onclick()}>Discover</button>   
            </div>
        </div>
    );
}

export default Card;