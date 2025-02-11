import "../styles/card.css";

type CardProps = Readonly<{
  name: string;
  email: string;
  phone: string;
  image: string;
}>;


function Card({ name, email, phone, image }: CardProps) {

    return (
        <div className="card-doctor">
            <div className="doctor-container">
                <img className="doctor_images" src={image} alt="doctor" />
                <h4><b>{name}</b></h4>
                <p>{email}</p>
                <p>{phone}</p>   
            </div>
        </div>
    );
}

export default Card;