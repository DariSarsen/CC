// import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      {user && <p className="text-lg">Добро пожаловать, {user.name}!</p>}

    </div>


    </>
    
  );
};

export default Dashboard;
