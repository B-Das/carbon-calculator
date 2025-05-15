import { jsPDF } from 'jspdf';

/**
 * Generates a PDF report from the calculator results
 * @param {Object} results - The results object containing emissions data
 * @param {Object} businessInfo - The business information
 * @returns {jsPDF} - The generated PDF document
 */
export function generatePDFReport(results, businessInfo) {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(44, 62, 80); // Dark blue color
  doc.text('Carbon Footprint Report', 105, 20, { align: 'center' });
  
  // Add business details
  doc.setFontSize(12);
  doc.setTextColor(52, 73, 94);
  
  const businessName = businessInfo?.name || 'Your Business';
  doc.text(`Business: ${businessName}`, 20, 40);
  
  if (businessInfo?.industry) {
    doc.text(`Industry: ${businessInfo.industry}`, 20, 50);
  }
  
  if (businessInfo?.employees) {
    doc.text(`Number of Employees: ${businessInfo.employees}`, 20, 60);
  }
  
  // Add date
  const today = new Date();
  const dateStr = today.toLocaleDateString();
  doc.text(`Report Date: ${dateStr}`, 20, 70);
  
  // Horizontal line
  doc.setDrawColor(210, 215, 220);
  doc.line(20, 75, 190, 75);
  
  // Summary section
  doc.setFontSize(16);
  doc.setTextColor(44, 62, 80);
  doc.text('Emissions Summary', 20, 90);
  
  // Total emissions
  doc.setFontSize(14);
  doc.text('Total Annual Carbon Footprint:', 20, 105);
  doc.setFontSize(16);
  doc.setTextColor(46, 204, 113); // Green color
  doc.text(`${results.total.toLocaleString()} kg CO₂e per year`, 150, 105);
  
  // Emissions breakdown
  doc.setFontSize(12);
  doc.setTextColor(52, 73, 94);
  
  // Calculate percentages
  const getPercentage = (value) => {
    return ((value / results.total) * 100).toFixed(1);
  };
  
  doc.text('Emissions Breakdown:', 20, 125);
  
  // Electricity
  doc.text(`Electricity: ${results.electricity.toLocaleString()} kg CO₂e (${getPercentage(results.electricity)}%)`, 30, 140);
  
  // Travel
  doc.text(`Business Travel: ${results.travel.toLocaleString()} kg CO₂e (${getPercentage(results.travel)}%)`, 30, 150);
  
  // Commuting
  doc.text(`Employee Commuting: ${results.commuting.toLocaleString()} kg CO₂e (${getPercentage(results.commuting)}%)`, 30, 160);
  
  // Recommendations section
  doc.setFontSize(16);
  doc.setTextColor(44, 62, 80);
  doc.text('Recommendations', 20, 180);
  
  doc.setFontSize(12);
  doc.setTextColor(52, 73, 94);
  
  // Standard recommendations
  doc.text('1. Switch to LED lighting to reduce electricity consumption.', 30, 195);
  doc.text('2. Use video conferencing to reduce business travel emissions.', 30, 205);
  doc.text('3. Encourage carpooling to reduce commuting emissions.', 30, 215);
  doc.text('4. Install smart thermostats to optimize energy usage.', 30, 225);
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(127, 140, 141);
  doc.text('This carbon footprint calculation is an estimate based on the information provided.', 105, 270, { align: 'center' });
  doc.text('For a more accurate assessment, consider engaging with a professional carbon accounting service.', 105, 275, { align: 'center' });
  
  return doc;
}

/**
 * Downloads the generated PDF report
 * @param {Object} results - The results object containing emissions data
 * @param {Object} businessInfo - The business information
 */
export function downloadPDFReport(results, businessInfo) {
  const doc = generatePDFReport(results, businessInfo);
  const businessName = businessInfo?.name?.replace(/\s+/g, '_').toLowerCase() || 'business';
  doc.save(`${businessName}_carbon_report.pdf`);
} 