import { NavLink } from 'react-router-dom';
import css from 'components/Header/Header.module.css';

export function Header() {
  return (
    <nav className={css.list}>
      <NavLink
        exact
        to="/"
        className={css.item}
        activeClassName={css.activeItem}
      >
        <span className={css.button}>Home</span>
      </NavLink>

      <NavLink
        to="/movies"
        className={css.item}
        activeClassName={css.activeItem}
      >
        <span className={css.button}>Movies</span>
      </NavLink>
    </nav>
  );
}
