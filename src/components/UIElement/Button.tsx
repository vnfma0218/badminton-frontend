interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: React.ReactNode;
  size: 'sm' | 'md' | 'lg';
  round: 'none' | 'rounded';
}
const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className='btn ' {...rest}>
      {children}
    </button>
  );
};
export default Button;
