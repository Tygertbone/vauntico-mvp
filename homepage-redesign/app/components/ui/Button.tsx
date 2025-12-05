import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus-visible';

const variants = {
  primary: 'px-8 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white hover:scale-105 hover:shadow-lg hover:shadow-[#6366F1]/50 active:scale-100',
  secondary: 'px-8 py-3 bg-transparent text-white border border-[#2A2A2A] hover:bg-white/5 hover:border-[#3A3A3A]',
  ghost: 'px-8 py-3 bg-transparent text-white underline decoration-[#A0A0A0] hover:decoration-white underline-offset-4'
};

export function Button({ children, variant = 'primary', onClick, className, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
