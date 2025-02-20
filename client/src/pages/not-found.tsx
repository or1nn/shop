import { AiOutlineFrown } from 'react-icons/ai';

const NotFound = () => {
  return (
    <div className="container mx-auto py-20">
      <h2 className="flex justify-center text-5xl text-blue-500 font-bold mb-4">
        <AiOutlineFrown />
      </h2>
      <p className="text-center text-3xl font-medium mb-2">
        К сожалению, указанная страница не найдена
      </p>
      <p className="text-center text-gray-500">
        Воспользуйтесь поиском или перейдите в каталог товаров
      </p>
    </div>
  );
};
export default NotFound;
