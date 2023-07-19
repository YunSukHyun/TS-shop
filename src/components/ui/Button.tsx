type ButtonProps = {
  text: string;
  onClick: () => void;
};
const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-105"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
