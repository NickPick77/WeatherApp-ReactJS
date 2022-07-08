import SearchInput from "../../components/SearchInput";
import WeatherCardList from "../../components/WeatherCardList";
import { SearchContextProvider } from "../../context/SearchContext/searchContext";
import { WeatherContextProvider } from "../../context/WeatherContext/weatherContext";

import styles from "./styles.module.scss";

const Home = () => {
  return (
    <WeatherContextProvider>
      <SearchContextProvider>
        <main className={styles.main}>
          <WeatherCardList />
        </main>
      </SearchContextProvider>
    </WeatherContextProvider>
  );
};

export default Home;
