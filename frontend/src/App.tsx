import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router";

import { AuthProvider } from "./contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>  
            
            <ToastContainer position="bottom-right" autoClose={3000} />
        </BrowserRouter>
        
    );
    
};

export default App;
