import { useEffect, useState } from "react";
import axios from "axios";
import { DisplayRecepie } from "./DisplayRecepie";
import { API_KEY } from "./App";

export function Recepies() {
  const [search, setSearch] = useState("");
  const [recepies, setRecepies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const fetchRecepies = () => {
    setHasSearched(true);

    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${search}`
      )
      .then((res) => {
        setRecepies(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div className="main-container">
      <h2>Best recipe bank</h2>
      <label>Search for a recipe, ingredient, or nutrient</label>
      <input value={search} onChange={handleSearch}></input>
      <button className="button" onClick={fetchRecepies}>
        Search..
      </button>
      {recepies.length > 0 ? (
        recepies.map((recipe) => (
          <DisplayRecepie key={recipe.id} data={recipe} />
        ))
      ) : hasSearched ? (
        <p>No recipe found with that search term</p>
      ) : null}
    </div>
  );
}
