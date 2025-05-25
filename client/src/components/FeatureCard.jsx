import React from 'react';

const FeatureCard = ({ title, description }) => {
  return (
    <div className="relative group h-full">
      {/* Card background with hover effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      
      {/* Main card */}
      <div className="relative h-full bg-white dark:bg-slate-800 shadow-md rounded-xl p-6 
                      transform transition-all duration-300 ease-in-out
                      group-hover:shadow-xl group-hover:shadow-purple-500/20 
                      group-hover:-translate-y-1 group-hover:scale-[1.02]
                      border border-gray-200 dark:border-slate-700
                      group-hover:border-purple-500/50 dark:group-hover:border-purple-400/50 
                      overflow-hidden z-10">
        
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-purple-500 to-indigo-500 
                        group-hover:h-full transition-all duration-500 ease-out"></div>
        
        {/* Card content with transitions */}
        <h3 className="relative text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2
                      transition-all duration-300 group-hover:translate-x-1">
          {title}
        </h3>
        
        <p className="relative text-sm text-gray-600 dark:text-gray-300
                      transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
