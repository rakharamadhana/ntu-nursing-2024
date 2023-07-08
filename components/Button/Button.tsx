type Props = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hidden?: boolean;
};

const Button = ({ text, onClick, hidden = false }: Props) => {

  if (hidden) return null;
  
  return (
    <button
      className="bg-slate-700 select-none font-bold h-[45px] min-w-[120px] rounded-[15px] text-white hover:opacity-60 transition active:opacity-80"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
