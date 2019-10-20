import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from "./Recipe";
import StackGrid, { transitions } from "react-stack-grid";

const { scaleDown } = transitions;

const App = () => {
  const APP_ID = '812a3a57';
  const APP_KEY = 'a41356828c2502dd855db1e0a7482746';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  //only submit after clicking search button
  const [query, setQuery] = useState('chicken');

  //useEffect: every time the page rerenders itself
  useEffect (() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">

      <nav className="navbar navbar-dark bg-dark justify-content-between">
        <a className="navbar-brand">Navbar</a>
        <form  onSubmit = {getSearch} className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={updateSearch}/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>

      <div className="container-fluid gallery">
          <StackGrid columnWidth={450} appear={scaleDown.appear} appeared={scaleDown.appeared} enter={scaleDown.enter} entered={scaleDown.entered} leaved={scaleDown.leaved} monitorImagesLoaded={true}>
          {recipes.map(recipe => (
            <Recipe 
                key = {recipe.recipe.uri}
                title ={recipe.recipe.label}
                calories = {recipe.recipe.calories}
                image = {recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                dietLabels = {recipe.recipe.dietLabels}/>
            ))}      
          </StackGrid>
      </div>

    </div>
  );
};

export default App;
