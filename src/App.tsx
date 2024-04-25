import Navbar from './components/navbar';
import HomePage from './pages/home-page';
import RecipePage from './pages/recipe-page';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:recipeId" element={<RecipePage />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<p>Catch all</p>} />
      </Routes>
    </div>
  );
}

export default App;
