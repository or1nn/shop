import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  active: boolean;
  setActive: (state: boolean) => void;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ setActive, children }) => {
  return (
    <div
      className={
        'h-full w-full bg-black/50 fixed z-10 flex items-center justify-center'
      }
      onClick={() => setActive(false)}
    >
      <div
        className={' bg-white relative rounded-md py-10 px-20 '}
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose
          onClick={() => setActive(false)}
          className="absolute top-0 -right-10 w-8 h-8 bg-white/20 rounded-md text-white cursor-pointer"
        />

        {children}
      </div>
    </div>
  );
};
