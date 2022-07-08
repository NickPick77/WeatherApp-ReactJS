import { useEffect, useState } from "react";
import { useWeatherContext } from "../../context/WeatherContext/weatherContext";
import { useSearchContext } from "../../context/SearchContext/searchContext";

import styles from "./styles.module.scss";

const SearchInput = () => {
  const { weatherStore, updateData, discardError } = useWeatherContext();

  const { searchStore, setSearchInput, getSuggestionsData, autoComplete } =
    useSearchContext();
  console.log(searchStore);

  const suggestionsCityName = searchStore.suggestions.map(
    (element) => element.name
  );
  //const userInput = initialState.searchInput;

  const filteredSuggestions = searchStore.suggestions.filter((suggestion) =>
    suggestion.name
      .toLowerCase()
      .includes(searchStore.searchInput.toLowerCase().trim())
  );
  //filteredSuggestion.sort(
  // (a) => userInput.valueOf(a) != userInput.indexOf(suggestionsCityName)
  //);
  console.log(filteredSuggestions);

  const handleUserInput = (element) => {
    setSearchInput(element.target.value);
  };

  const handleSubmit = () => {
    updateData(searchStore.searchInput);
    setSearchInput("");
  };

  const handleSuggestionClicked = (e) => {
    updateData(e);
  };

  const handleKeyDown = (e) => {
    const sentinel = e.keyCode;
    const enter = 13;
    const arrowUp = 38;
    const arrowDown = 40;
    switch (sentinel) {
      case enter:
        updateData(searchStore.searchInput);
        setSearchInput("");
        break;
      case arrowUp:
        break;
      case arrowDown:
        break;
      default:
        setSearchInput(searchStore.searchInput);
        getSuggestionsData(searchStore.searchInput);
        autoComplete(filteredSuggestions);
        break;
    }
  };

  useEffect(() => {
    weatherStore.error && setTimeout(discardError, 3000);
  }, [weatherStore.error]);

  return (
    <div className={styles.Container}>
      <label htmlFor="searchInput">
        <input
          type="text"
          id="searchInput"
          name="searchInput"
          value={searchStore.searchInput}
          onChange={handleUserInput}
          onKeyDown={handleKeyDown}
        />
      </label>
      <input type="submit" onClick={handleSubmit} autoComplete="off" />
      {filteredSuggestions &&
        filteredSuggestions.map((e) => (
          <>
            <ul>
              <li onClick={() => handleSuggestionClicked(e.url)}>{e.name}</li>
            </ul>
          </>
        ))}
      {weatherStore.error && (
        <div className={styles.Alert}>
          <p>la città cercata non è stata trovata</p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
