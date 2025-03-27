import Link from 'next/link';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ href, children, className, variant = 'primary', type, onClick, disabled }: ButtonProps) {
  const styles = {
    primary: `inline-block bg-gradient-to-r from-[#F34B6D] to-[#374091] text-white px-10 py-3 rounded-[1.3rem] text-xl font-bold transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`,
    secondary: `inline-block bg-white border-2 border-[#F34B6D] text-[#F34B6D] px-10 py-3 rounded-[1.3rem] text-xl font-bold transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`
  };

  // Pokud je href a není disabled, zobrazí se Link
  if (href && !disabled) {
    return (
      <Link 
        href={href}
        className={className || styles[variant]}
      >
        {children}
      </Link>
    );
  }

  // Pokud není href nebo je disabled, zobrazí se button
  return (
    <button
      type={type || 'button'}
      className={className || styles[variant]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 