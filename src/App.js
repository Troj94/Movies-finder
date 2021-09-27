import './App.css';
import { useState } from 'react';

import { Header } from 'components/Header/Header';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { SearchBar } from 'components/SearchBar/SearchBar';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  const goHome = () => {
    setSearchOpen(false);
  };

  const openSearch = () => {
    setSearchOpen(true);
  };

  return (
    <div className="App">
      <Header openSearch={openSearch} goHome={goHome} />
      <hr></hr>
      {!searchOpen ? (
        <div>
          Trending today
          <MoviesList />
        </div>
      ) : (
        <SearchBar />
      )}
    </div>
  );
}

export default App;
