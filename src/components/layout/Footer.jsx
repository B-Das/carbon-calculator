import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white/80 py-8 border-t border-gray-200 shadow-inner">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">About CarbonCalC</h3>
            <p className="text-sm text-gray-600">
              Helping businesses understand and reduce their environmental impact through accurate carbon footprint calculation and actionable insights.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-600 hover:text-primary">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
            <p className="text-sm text-gray-600 mb-2">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <Link 
              to="/about#contact" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} CarbonCalC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}