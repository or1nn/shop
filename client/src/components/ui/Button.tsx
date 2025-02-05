import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  fz?: string;
  variant?: 'primary' | 'subtle' | 'outline';
  disabled?: boolean;
  width?: string;
  isActive?: boolean;
  onClick?: (e?: any) => any;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  onClick,
  fz,
  disabled,
  isActive,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'py-2 px-4 rounded-md cursor-pointer flex items-center justify-center disabled:bg-gray-500 disabled:cursor-default',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'outline' &&
          (isActive
            ? 'bg-blue-500 text-white border-1 border-blue-500 '
            : 'bg-white text-blue-500 border-1 border-blue-500 '),
        variant === 'subtle' && 'bg-gray-100',
        fz ? `text-${fz}` : 'text-normal',
        className
      )}
    >
      {children}
    </button>
  );
};
