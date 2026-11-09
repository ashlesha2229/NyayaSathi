import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const ComplaintForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const draft = location.state; // Saved draft data yahan aayega

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    victimName: "Ashlesha Sharma",
    location: "Delhi",
  });

  // Agar draft ke saath aaye to form fill kar do
  useEffect(() => {
    if (draft) {
      setFormData({
        title: draft.title || "",
        category: draft.category || "",
        description: "Yahan pehle wala description hoga...",
        victimName: "Ashlesha Sharma",
        location: "Delhi",
      });
    }
  }, [draft]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveDraft = () => {
    alert("✅ Draft Saved Successfully!");
    navigate('/savedcomplaints');
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      alert("Title aur Description fill karna zaroori hai");
      return;
    }
    alert("🎉 Complaint Submitted Successfully!");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/savedcomplaints')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={20} /> Back to Saved Complaints
        </button>

        <div className="bg-white rounded-3xl shadow p-8">
          <h1 className="text-3xl font-semibold text-[#0A2540] mb-1">
            {draft ? "Continue Complaint" : "New Complaint"}
          </h1>
          <p className="text-gray-600 mb-8">Fill your legal complaint details</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Complaint Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933]"
                placeholder="e.g. Salary not paid for 3 months"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933]"
              >
                <option value="">Select Category</option>
                <option value="Labour Law">Labour Law</option>
                <option value="Tenant Rights">Tenant Rights</option>
                <option value="Consumer Protection">Consumer Protection</option>
                <option value="Family Law">Family Law</option>
                <option value="Criminal Law">Criminal Law</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Detailed Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933]"
                placeholder="Explain your problem in detail..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input type="text" value={formData.victimName} className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-50" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input type="text" value={formData.location} className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-50" readOnly />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleSaveDraft}
              className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Save size={20} /> Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 bg-[#FF9933] hover:bg-[#e88a2e] text-black font-semibold rounded-2xl transition"
            >
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;