import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/MainHeader";
import Footer from "../components/Footer";  

const InfoDetails = ({ info}) => {
  const { id } = useParams();
  const [infoDetails, setInfoDetails] = useState({});

  useEffect(() => {
    const filteredRecipe = info.find((info) => info.id === id);
    // const filteredRecipe = info.find((recipe) => recipe.id === parseInt(id, 10));
    setInfoDetails(filteredRecipe);
  }, [id, info]);

  return (
    <>
    <Header />
    {infoDetails && (

      <div className="recipe-details">
        <img src={infoDetails.image} alt={infoDetails.title} />
        <h1 className="font-bold text-red-600 text-xl ">{infoDetails.title}</h1>
        <p>{infoDetails.description}</p>
        <div>
          <h2 className="font-bold text-red-600 text-xl ">Steps to save Animals :-</h2>
          <ul>
            {
              infoDetails.steps && infoDetails.steps.map(element=>{
                return(
                  <li key={element}>{element}</li>
                )
              }) 
            }
          </ul>
        </div>
      </div>
    )}
        <Footer />
    </>
  )
};

export default InfoDetails;