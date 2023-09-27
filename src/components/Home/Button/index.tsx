import { useNavigate } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';

interface ButtonProps {
  buttonContent: string;
  color: string;
  path: string;
}

const Button = ({ buttonContent, color, path }: ButtonProps) => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate(path);
  };
  return (
    <div className="w-full">
      <button
        className={`w-full flex items-center justify-between py-3 rounded-md text-left px-4 font-bold border-[1px] border-${color} text-${color} `}
        onClick={onHandleClick}
      >
        {buttonContent}
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default Button;
