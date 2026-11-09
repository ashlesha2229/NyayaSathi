import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ Save token and full user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        toast.success("✅ Login Successful!", { duration: 2000 });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server se connect nahi ho pa raha. Backend chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center p-6">
      <Toaster position="top-center" />

      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-[#0A2540]" />
            <h1 className="text-4xl font-bold text-[#0A2540]">NyayaSathi</h1>
          </div>
          <p className="text-[#0A2540] text-lg font-medium">Your Rights, Our Fight</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to continue</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="accent-[#FF9933]"
                />
                Remember me
              </label>
              <a href="#" className="text-[#FF9933] text-sm hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF9933] hover:bg-[#e88a2e] text-black py-3.5 rounded-2xl font-semibold text-lg transition-all shadow-md disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#FF9933] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;