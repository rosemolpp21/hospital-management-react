import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const Withauthcomponent: React.FC = () => {
    const navigate = useNavigate();
    const isauth = localStorage.getItem("token");

    useEffect(() => {
      if (!isauth) {
        navigate("/");
      }
    }, [isauth, navigate]);

    return isauth ? <WrappedComponent  /> : null;
  };
  return Withauthcomponent;
};

export default WithAuth;
