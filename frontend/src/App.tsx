import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
    return (
        <BrowserRouter>
            <AppRouter />
            
        <ToastContainer position="bottom-right" autoClose={3000} />
        </BrowserRouter>
        
    );
    
};

export default App;
