export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About CarbonCalC</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600">
        <p className="lead text-xl mb-6">
          CarbonCalC is a comprehensive tool designed to help businesses measure, understand, and reduce their carbon footprint.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
        <p>
          Our mission is to empower businesses of all sizes to take meaningful action on climate change by providing 
          accessible tools to measure and reduce carbon emissions. We believe that what gets measured gets managed, 
          and our calculator is the first step toward sustainable business practices.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h2>
        <p>
          CarbonCalC uses internationally recognized greenhouse gas (GHG) accounting standards to calculate your 
          business's carbon footprint across three key areas:
        </p>
        
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>Electricity Usage:</strong> Calculates emissions from your office and facility energy consumption.</li>
          <li><strong>Business Travel:</strong> Tracks emissions from business-related air travel, car rentals, and other transport.</li>
          <li><strong>Employee Commuting:</strong> Estimates emissions from your team's daily commute to work.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Methodology</h2>
        <p>
          Our calculator uses emission factors from reputable sources including:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>EPA Emissions Factors for Greenhouse Gas Inventories</li>
          <li>Greenhouse Gas Protocol</li>
          <li>International Energy Agency (IEA)</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Privacy & Security</h2>
        <p>
          We understand that business data is sensitive. CarbonCalC does not store your calculation data on our servers. 
          All calculations are performed in your browser, ensuring your information remains private and secure.
        </p>
        
        <h2 id="contact" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Get In Touch</h2>
        <p className="mb-6">
          Have questions or feedback about CarbonCalC? We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.
        </p>
        <div className="mt-6 rounded-lg shadow-md overflow-hidden border border-gray-200">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLScVqy5ZIx9C9EzGo9sM9n5ed6A3qFBKkRcQeu6ujUQe6BMNxw/viewform?embedded=true" 
            width="100%" 
            height="500" 
            style={{ border: 0 }}
            title="Contact Form"
            aria-label="Contact Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
} 