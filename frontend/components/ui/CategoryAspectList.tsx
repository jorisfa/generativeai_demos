import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import HoverCard from "./HoverCard"; // Make sure to import your HoverCard component

interface AspectItem {
  item: string;
  quotes: string[];
}

interface CategoryAspectListProps {
  categoryName: string;
  aspects: AspectItem[];
  isPositive: boolean;
}

const CategoryAspectList: React.FC<CategoryAspectListProps> = ({
  categoryName,
  aspects,
  isPositive,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Trigger the animation after a short delay (adjust as needed)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h3 
        className={`font-semibold mb-2 transition-transform duration-200
        ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}>
          {categoryName}
        </h3>
      <ul className="space-y-2">
        {aspects.map((aspect, index) => (
          <li
            key={index}
            className={`flex flex-col space-y-1 group relative transition-all duration-400 
            ${isVisible ? "opacity-100" : "opacity-0"}
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center space-x-2">
              {isPositive ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500" />
              )}
              <span>{aspect.item}</span>
            </div>
            {/* Quote Card (conditionally rendered) */}
            {hoveredIndex === index && aspect.quotes.length > 0 && (
              <HoverCard isVisible={hoveredIndex === index}>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
                  {aspect.quotes.map((quote, quoteIndex) => (
                    <li key={quoteIndex}>{quote}</li>
                  ))}
                </ul>
              </HoverCard>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryAspectList;
