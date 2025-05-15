import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import { CalculatorProvider } from './context/CalculatorContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="calculator"
            element={
              <CalculatorProvider>
                <CalculatorPage />
              </CalculatorProvider>
            }
          />
          <Route
            path="results"
            element={
              <CalculatorProvider>
                <ResultsPage />
              </CalculatorProvider>
            }
          />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
