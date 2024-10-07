// AspectList.tsx (modified)
import React from "react";
import CategoryAspectList from "./CategoryAspectList";

interface AspectItem {
    item: string;
    quotes: string[];
  }
  
  interface AspectListData {
    [sentiment: string]: {
      [category: string]: AspectItem[]; // Changed from string[] to AspectItem[]
    };
  }

const AspectList: React.FC<{ aspects: AspectListData }> = ({ aspects }) => (
  <div className="space-y-4">
    {Object.entries(aspects).map(([sentiment, categories]) =>
      Object.entries(categories).map(([category, aspects]) => (
        <CategoryAspectList
          key={category}
          categoryName={category}
          aspects={aspects}
          isPositive={sentiment === "positive"}
        />
      ))
    )}
  </div>
);

export default AspectList;
