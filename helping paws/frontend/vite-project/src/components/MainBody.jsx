import React from "react";
import { Link } from "react-router-dom";

const MainBody = ({info }) => {
 
  return (
    <>
      <article className="recipes">
        <section className="containers">
          {info.map((element, index) => {
            return <Card key={index} element={element} />;
          })}
        </section>
      </article>
    </>
  );
};

export default MainBody;

const Card = ({ element }) => {
  return (
    <Link to={`/info/${element.id}`} className="card">
      <img src={element.image} alt={element.title} />
      <h4>{element.title}</h4>
    </Link>
  );
};