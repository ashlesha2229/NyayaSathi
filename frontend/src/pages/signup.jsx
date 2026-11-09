import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, UserPlus, Phone, MapPin } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    agreeTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.location
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        toast.success("🎉 Account Created Successfully!", { duration: 3000 });
        navigate('/dashboard');
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server se connect nahi ho pa raha!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center p-6">
      <Toaster position="top-center" />

      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-[#0A2540]" />
            <h1 className="text-4xl font-bold text-[#0A2540]">NyayaSathi</h1>
          </div>
          <p className="text-[#0A2540] text-lg font-medium">Your Rights, Our Fight</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <UserPlus className="w-7 h-7 text-[#FF9933]" />
            <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none"
                placeholder="Ashlesha Sharma"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 px-5 py-3.5 border border-gray-300 rounded-2xl focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City / Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-11 px-5 py-3.5 border border-gray-300 rounded-2xl focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none"
                    placeholder="Delhi / Pune"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="mt-1 accent-[#FF9933] w-4 h-4"
              />
              <p className="text-sm text-gray-600 leading-relaxed">
                I agree to the <span className="text-[#FF9933] hover:underline cursor-pointer">Terms & Conditions</span> and{' '}
                <span className="text-[#FF9933] hover:underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF9933] hover:bg-[#e88a2e] text-black py-3.5 rounded-2xl font-semibold text-lg transition-all mt-4 shadow-md disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF9933] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;