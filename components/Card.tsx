
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const cardClasses = `
    bg-card dark:bg-card-dark 
    rounded-2xl 
    shadow-lg 
    p-4 sm:p-6 
    transition-all 
    duration-300 
    ease-in-out
    hover:shadow-xl 
    dark:hover:shadow-primary/20
    ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
