import { useLoginForm } from "../../../hooks/auth/useLoginForm";

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin } = useLoginForm();

  return (

    <div className="min-h-screen flex relative overflow-hidden">
      {/* Центрированный вертикальный текст поверх всего */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 z-10 pointer-events-none">
        <span className="text-[140px] font-bold font-bubble uppercase text-transparent bg-clip-text bg-linear-to-b from-white from-50% to-red-800 to-50% drop-shadow-lg/50 leading-none">
          SIGN IN
        </span>
      </h1>

      {/* Левая часть — изображение */}
      <div className="w-1/2 relative z-0">
        <img
          src="/images/signin.png"
          alt="students"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Правая часть — форма входа */}
      <div className="w-1/2 bg-gray-300 flex flex-col items-center justify-center p-12 z-0">
        <h2 className="text-7xl font-bold text-red-700 mb-12 drop-shadow-sm/50">Sign in</h2>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">

          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border-b-2 border-gray-300 focus:outline-hidden bg-white/30 focus:border-red-600 transition-colors duration-300"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-1 px-1 text-gray-500 text-sm transition-all duration-200
                        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border-b-2 border-gray-300 focus:outline-hidden bg-white/30 focus:border-red-600 transition-colors duration-300"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1 px-1 text-gray-500 text-sm transition-all duration-200
                        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600">
              Password
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-red-700 text-white px-6 py-2 rounded-sm shadow-md hover:bg-red-800 transition-all"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <a href="/auth/forgot-password"
              type="button"
              className="text-gray-600 px-6 py-2 rounded-sm transition-all hover:text-red-700 underline">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
