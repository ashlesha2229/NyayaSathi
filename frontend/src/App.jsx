import { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, Shield } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup'; 
import Dashboard from './pages/Dashboard'; 
import ProfileInfo from './pages/ProfileInfo';
import LawLibrary from './pages/lawlibrary';
import Reminders from './pages/reminders';
import FindLawyers from './pages/findlawyers';
import SavedComplaints from './pages/savedcomplaints';
import SavedDocuments from './pages/saveddocuments';
import MyCases from './pages/mycases';

// ==================== HOME PAGE ====================
function Home() {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!problem.trim()) return toast.error("Problem likho!");

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:5000/api/analyze', {
        problem: problem.trim()
      });

      setResult(res.data);
      toast.success("Analysis Complete!");
      console.log("Backend Response:", res.data);

    } catch (err) {
      console.error(err);
      toast.error("Backend se connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808]">
      <Toaster position="top-center" />

      <nav className="bg-[#0A2540] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-9 h-9 text-[#FF9933]" />
            <h1 className="text-3xl font-bold tracking-tight">NyayaSathi</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#0A2540] mb-4">Know Your Rights</h2>
          <p className="text-xl text-gray-800">Your Problem, Our Solution – Instant Legal Help</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 mb-12 border border-white">
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Yahan apni problem likho..."
            className="w-full h-56 p-6 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] resize-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-8 w-full bg-[#FF9933] hover:bg-[#E07A2F] text-white py-5 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={28} /> : <Send size={28} />}
            {loading ? "Analyzing..." : "Analyze My Problem"}
          </button>
        </div>

        {/* ==================== RESULT DISPLAY (Image jaisa) ==================== */}
        {result && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <h3 className="text-2xl font-bold text-red-600">{result.violation}</h3>
            </div>

            <div className="space-y-8 text-gray-800">
              <div className="flex gap-8 text-sm">
                <p><strong>Category:</strong> {result.category}</p>
                <p>
                  <strong>Urgency:</strong> 
                  <span className="ml-2 px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    {result.urgency}
                  </span>
                </p>
              </div>

              {result.laws && (
                <p><strong>Relevant Laws:</strong> {result.laws}</p>
              )}

              <div>
                <strong>Message:</strong>
                <p className="mt-2 text-lg leading-relaxed">{result.message}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">✅ Action Plan</h4>
                <ul className="space-y-4">
                  {result.steps?.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-7 h-7 bg-[#FF9933] text-white rounded-full flex items-center justify-center font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="pt-0.5">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {result.complaintDraft && (
                <div>
                  <h4 className="font-semibold mb-3">📄 Ready Complaint Draft</h4>
                  <pre className="bg-gray-50 p-6 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap border border-gray-200">
                    {result.complaintDraft}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfileInfo />} />
      <Route path="/mycases" element={<MyCases />} />
      <Route path="/savedcomplaints" element={<SavedComplaints />} />
      <Route path="/saveddocuments" element={<SavedDocuments />} />
      <Route path="/findlawyers" element={<FindLawyers />} />
      <Route path="/lawlibrary" element={<LawLibrary />} />
      <Route path="/reminders" element={<Reminders />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;