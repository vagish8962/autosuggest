import React from 'react';
import AutoSuggest from "./autoSuggest";

const staticData = [
  "apple",
  "banana",
  "berrl",
  "orange",
  "grape",
  "mango",
  "melon",
  "berry",
  "peach",
  "cherry",
  "plum",
];

function App() {

  const fetchSuggestion = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  }

  return <AutoSuggest
    placeholder="Enter the recipe"
    fetchSuggestion={fetchSuggestion}
    dataKey="name"
    onChange={() => { }}
    onFocus={() => { }}
    onBlur={() => { }}
    loadingIcon="()"
    className=""
  // staticSuggestions={staticData}
  />
}

export default App
