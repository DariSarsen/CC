import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="flex justify-center items-center h-screen ">
        <h1 className="text-3xl font-bold">Добро пожаловать в Job Portal. <Link to="/dashboard" className="text-blue-500">Перейти в личный кабинет</Link></h1>     
      </div>
    );
  };
  
  export default Home;
  