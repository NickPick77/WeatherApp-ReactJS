import { useEffect, useState } from "react";
import { useWeatherContext } from "../../context/WeatherContext/weatherContext";
import { useSearchContext } from "../../context/SearchContext/searchContext";

import { IoSearch } from "react-icons/io5";

import styles from "./styles.module.scss";

const SearchInput = () => {
  const [isShow, setIsShow] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const { weatherStore, updateData, discardError } = useWeatherContext();

  const { searchStore, setSearchInput, getSuggestionsData, autoComplete } =
    useSearchContext();

  const handleFilteredSuggestions = () => {
    setFilteredSuggestions(
      searchStore.suggestions.filter((suggestion) =>
        suggestion.name
          .toLowerCase()
          .includes(searchStore.searchInput.toLowerCase().trim())
      )
    );
  };

  const handleUserInput = (element) => {
    setSearchInput(element.target.value);
  };

  const handleSubmit = (e) => {
    setIsShow((prev) => !prev);
    // console.log(e);
    // updateData(searchStore.searchInput);
    // setSearchInput("");
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
    // eslint-disable-next-line
  }, [weatherStore.error]);

  useEffect(() => {
    handleFilteredSuggestions();

    // eslint-disable-next-line
  }, [searchStore]);

  return (
    <div className={styles.ContainerSearchInput}>
      <div className={styles.ContainerSearchInput__Wrapper}>
        <label htmlFor="searchInput">
          <input
            className={
              isShow
                ? styles.ContainerSearchInput__Wrapper__input
                : styles.ContainerSearchInput__Wrapper__inputHidden
            }
            type="text"
            id="searchInput"
            name="searchInput"
            autoComplete="off"
            value={searchStore.searchInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyDown}
          />
        </label>

        <div
          className={styles.ContainerSearchInput__Wrapper__submit}
          onClick={handleSubmit}
        >
          <IoSearch
            className={styles.ContainerSearchInput__Wrapper__submit__icon}
          />
        </div>
      </div>
      <ul className={styles.WrapperAutoComplete}>
        {isShow
          ? filteredSuggestions &&
            filteredSuggestions.map((e) => (
              <li
                className={styles.WrapperAutoComplete__li}
                onClick={() => handleSuggestionClicked(e.url)}
              >
                {e.name}
              </li>
            ))
          : ""}
      </ul>
      {weatherStore.error && (
        <div className={styles.Alert}>
          <p>la città cercata non è stata trovata</p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
