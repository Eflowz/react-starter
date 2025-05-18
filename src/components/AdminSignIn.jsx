import { useTheme } from '../Context/ThemeContext';


export default function AdminSignIn() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-gray-100 to-slate-200 text-gray-900'
          : 'bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100'
      }`}
    >
      <div
        className={`rounded-xl shadow-2xl w-full max-w-md p-8 space-y-6 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Admin Sign In
          </h1>
          <p
            className={`text-sm font-medium mt-1 ${
              theme === 'light' ? 'text-red-600' : 'text-red-400'
            }`}
          >
            🔒 Admin Only
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === 'light' ? 'border-gray-300' : 'border-gray-700 bg-gray-800 text-white'
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === 'light' ? 'border-gray-300' : 'border-gray-700 bg-gray-800 text-white'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

