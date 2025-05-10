// src/auth/Login.tsx
import { useLoginForm } from "../../../hooks/auth/useLoginForm";

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin } = useLoginForm();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Вход</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-3 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
