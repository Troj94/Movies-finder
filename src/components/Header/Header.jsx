// import css from 'components/Header/Header.module.css';

export function Header({ goHome, openSearch }) {
  return (
    <header>
      <button type="submit" onClick={goHome}>
        Home
      </button>
      <button type="submit" onClick={openSearch}>
        Movies
      </button>
    </header>
  );
}
