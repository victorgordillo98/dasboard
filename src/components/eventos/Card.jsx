import React from "react";
import PropTypes from "prop-types";

import "./card.css";

function Card({ imageSource, title, text, url , fechaIni, fechaFin, estado}) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div>
        <h4 className="card-title">{title}</h4>
        <br />
        <p className="card-text">{text}</p>
        <br />
        <p className="card-text">{fechaIni}</p>
        <br />
        <p className="card-text">{fechaFin}</p>
        <br />
        <p className="card-text">{estado}</p>
        <br />
        <a href={url ? url : "#!"} target="_blank" className="btn btn-outline-secondary border-0" rel="noreferrer">Editar </a>
        <a href={url ? url : "#!"} target="_blank" className="btn btn-outline-secondary border-0" rel="noreferrer"> Eliminar</a>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default Card;