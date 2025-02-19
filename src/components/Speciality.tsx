import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Specialitycard";
import Navbar from "./navbar";

interface Speciality {
  speciality_id: number;
  name: string;
  description: string;
}

const SpecialityList: React.FC = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/specializations")
      .then((res) => {
        if (res.data) {
          setSpecialities(res.data);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="doctor-list-container">
      <Navbar />
      <h1 id="doctor-team-mainheading">Specialities</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="doctor-list">
        {specialities.length > 0 ? (
          specialities.map((speciality) => (
            <div key={speciality.speciality_id} className="doctor-card">
              <Card
                desc={speciality.description}
                name={speciality.name}
                image={`/assets/specialities/Speciality-${speciality.speciality_id}.jpg`}
              />
            </div>
          ))
        ) : (
          !error && <p>Loading specialities...</p> 
        )}
      </div>
    </div>
  );
};

export default SpecialityList;
