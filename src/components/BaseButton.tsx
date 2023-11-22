import React from 'react';

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const BaseButton: React.FC<BaseButtonProps> = ({ children, className = '', ...props }) => (
  <button className={`rounded-lg px-4 py-2 flex items-center justify-center ${className}`} {...props}>
    {children}
  </button>
);
