import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div 
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50"
      itemScope
      itemType="https://schema.org/WebSite"
    >
      <meta itemProp="name" content="CarbonCalC - Business Carbon Footprint Calculator" />
      <meta itemProp="description" content="Free carbon footprint calculator for businesses. Calculate, track and reduce your organization's carbon emissions easily." />
      <meta itemProp="url" content="https://carboncalc.com" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 sm:py-12 max-w-full sm:max-w-5xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
