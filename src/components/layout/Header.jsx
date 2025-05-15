import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" aria-label="CarbonCalC - Carbon Footprint Calculator Home" data-testid="nav-home">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary sm:h-8 sm:w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828l-3.172-3.172a2 2 0 00-2.828 0L8 7.343v7.9zM10 3a1 1 0 10-2 0v3a1 1 0 102 0V3z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 font-bold text-lg sm:text-xl text-gray-900" itemProp="name">CarbonCalC</span>
            <span className="sr-only">Carbon Footprint Calculator</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-wrap space-x-2 sm:space-x-4 ml-auto">
              <NavLink 
                to="/" 
                className={({isActive}) => `px-2 py-1 sm:px-3 sm:py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                end
                data-testid="nav-home-desktop"
              >
                Home
              </NavLink>
              <NavLink 
                to="/calculator" 
                className={({isActive}) => `px-2 py-1 sm:px-3 sm:py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                data-testid="nav-calculator"
              >
                Calculator
              </NavLink>
              <NavLink 
                to="/results" 
                className={({isActive}) => `px-2 py-1 sm:px-3 sm:py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                data-testid="nav-results"
              >
                Results
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => `px-2 py-1 sm:px-3 sm:py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                data-testid="nav-about"
              >
                About
              </NavLink>
          </nav>
        </div>
        
        {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-1 sm:space-y-2">
              <NavLink 
                to="/" 
                className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                end
                onClick={() => setIsMenuOpen(false)}
                data-testid="nav-home-mobile"
              >
                Home
              </NavLink>
              <NavLink 
                to="/calculator" 
                className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
                data-testid="nav-calculator-mobile"
              >
                Calculator
              </NavLink>
              <NavLink 
                to="/results" 
                className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
                data-testid="nav-results-mobile"
              >
                Results
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
                data-testid="nav-about-mobile"
              >
                About
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
