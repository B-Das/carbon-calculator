import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

/**
 * EmissionsChart - Component to display a pie chart of emissions breakdown by category
 * @param {Object} props
 * @param {Object} props.results - The emissions results object
 */
export default function EmissionsChart({ results }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Calculate percentages
  const getPercentage = (value) => {
    return ((value / results.total) * 100).toFixed(1);
  };

  useEffect(() => {
    // Clean up any existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create the new chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Electricity', 'Business Travel', 'Employee Commuting'],
          datasets: [
            {
              data: [
                results.electricity,
                results.travel,
                results.commuting
              ],
              backgroundColor: [
                'rgba(66, 133, 244, 0.8)',   // Blue for electricity
                'rgba(255, 167, 38, 0.8)',   // Yellow for travel
                'rgba(52, 168, 83, 0.8)',    // Green for commuting
              ],
              borderColor: [
                'rgba(66, 133, 244, 1)',
                'rgba(255, 167, 38, 1)',
                'rgba(52, 168, 83, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.raw;
                  const percentage = ((value / results.total) * 100).toFixed(1);
                  return `${context.label}: ${value.toLocaleString()} kg CO₂e (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }

    // Clean up chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [results]);

  return (
    <div className="relative w-full h-80 sm:h-96 min-h-[26rem] pb-12 overflow-visible">
      <canvas ref={chartRef} />
      {/* Responsive legend below the chart */}
      <div className="flex flex-col items-center mt-4 space-y-2 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-xs sm:text-sm text-gray-600">Electricity ({getPercentage(results.electricity)}%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-xs sm:text-sm text-gray-600">Travel ({getPercentage(results.travel)}%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-xs sm:text-sm text-gray-600">Commuting ({getPercentage(results.commuting)}%)</span>
        </div>
      </div>
    </div>
  );
} 