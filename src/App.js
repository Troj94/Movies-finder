import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AppBar } from 'components/AppBar/AppBar';
import { Spinner } from 'components/Loader/Loader';

import './App.css';

const HomePage = lazy(() => import('components/views/HomePage/HomePage'));
const SearchMoviesPage = lazy(() =>
  import('components/views/SearchMoviesPage/SearchMoviesPage'),
);
const DetailsPage = lazy(() =>
  import('components/views/DetailsPage/DetailsPage'),
);

function App() {
  return (
    <div className="App">
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <SearchMoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <DetailsPage />
          </Route>
          {/* <Route path="*" component={HomePage} /> */}
          <Route>
            <Redirect to={HomePage} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
