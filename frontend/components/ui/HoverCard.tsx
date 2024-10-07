import React from "react";
import clsx from "clsx";


interface HoverCardProps {
  children: React.ReactNode; // Content to display in the card
  isVisible: boolean; // Flag to control visibility
  className?: string; // Optional additional class names
}

const HoverCard: React.FC<HoverCardProps> = ({ children, isVisible,className }) => {
  return (
    <div className={`absolute top-full left-0 z-10 bg-white p-4 rounded-md shadow-md w-64 ${className}`}>
      {children}
    </div>)
};

export default HoverCard;
