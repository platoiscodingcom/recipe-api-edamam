import React from 'react';
import {Animated} from "react-animated-css";

const Recipe = ({title, calories, image, ingredients, dietLabels}) => {
  const listDietLabels = dietLabels.map((label) => <p>{label.text + `  `}</p>);
  const listIngr = ingredients.map((ingredient) => <li>{ingredient.text}</li>);
  return (
    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
    <div className="card">
        <img src={image} alt=""/>
        <div className="card-body">
          <h6 className="category">{listDietLabels}</h6>
          <h4 className="card-title">{title}</h4>
            <ul className = "card-text listIngr">
                {listIngr} </ul>
            <p>Calories: {calories}</p>
            <button>Find it</button>
        </div>
    </div>
    </Animated>
  )
}

export default Recipe;