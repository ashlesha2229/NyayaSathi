import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Mail, Phone, MapPin, Edit2, Save, Upload } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const ProfileInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [currentUser, setCurrentUser] = useState(null);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const [caseForm, setCaseForm] = useState({
    caseTitle: '',
    caseCategory: '',
    caseDescription: '',
    oppositePerson: '',
    oppositePersonPhone: '',
    oppositePersonAddress: '',
    caseDocuments: '',
    amount: '',
    urgency: 'medium',
  });

  // Load logged in user data
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);

      setProfile({
        name: user.fullName || user.name || user.username || '', 
        email: user.email || '',
        phone: user.phone || '',
        location: user.city || user.location || '',
      });
    }
  }, []);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCaseChange = (field, value) => {
    setCaseForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCaseForm(prev => ({ ...prev, caseDocuments: file.name }));
      toast.success(`${file.name} uploaded successfully!`);
    }
  };

  const saveProfile = () => {
    toast.success('Profile updated successfully!');
    setEditMode(false);
  };

  const submitCase = () => {
    if (!caseForm.caseTitle || !caseForm.caseCategory || !caseForm.caseDescription) {
      toast.error('Please fill all required fields!');
      return;
    }
    toast.success('Case filed successfully! Case ID: CASE-2026-001');
    
    // Reset form
    setCaseForm({
      caseTitle: '', 
      caseCategory: '', 
      caseDescription: '', 
      oppositePerson: '',
      oppositePersonPhone: '', 
      oppositePersonAddress: '', 
      caseDocuments: '',
      amount: '', 
      urgency: 'medium'
    });
  };

  const categories = [
    'Labour Law', 'Tenant Rights', 'Consumer Protection', 'Criminal Law',
    'Family Law', 'Property Disputes', 'Contract Disputes', 'Other'
  ];

  const userInitial = profile.name ? profile.name[0].toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808]">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-[#0A2540] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hover:bg-white/10 p-2 rounded-lg transition">
              <ArrowLeft size={28} />
            </Link>
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-[#FF9933]" />
              <h1 className="text-3xl font-semibold">NyayaSathi</h1>
            </div>
          </div>
          <p className="text-gray-300">Profile & Case Management</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`px-8 py-3 rounded-2xl font-semibold transition-all ${activeTab === 'profile' ? 'bg-[#0A2540] text-white shadow-lg' : 'bg-white text-[#0A2540] border-2 border-[#0A2540] hover:bg-gray-50'}`}
          >
            My Profile
          </button>
          <button 
            onClick={() => setActiveTab('case')} 
            className={`px-8 py-3 rounded-2xl font-semibold transition-all ${activeTab === 'case' ? 'bg-[#0A2540] text-white shadow-lg' : 'bg-white text-[#0A2540] border-2 border-[#0A2540] hover:bg-gray-50'}`}
          >
            File New Case
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="col-span-1 bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[#FF9933] text-[#0A2540] rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                  {userInitial}
                </div>
                <h2 className="text-2xl font-semibold text-[#0A2540]">{profile.name || 'User Name'}</h2>
                <p className="text-gray-500 mt-1">Member since 2026</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={20} className="text-[#FF9933]" />
                  <span>{profile.email || 'No email added'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={20} className="text-[#FF9933]" />
                  <span>{profile.phone || 'No phone added'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={20} className="text-[#FF9933]" />
                  <span>{profile.location || 'No location added'}</span>
                </div>
              </div>

              <button 
                onClick={() => setEditMode(!editMode)} 
                className="w-full flex items-center justify-center gap-2 bg-[#FF9933] hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition-all"
              >
                <Edit2 size={20} />
                {editMode ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>

            {/* Edit Form + Statistics */}
            <div className="col-span-2">
              {editMode ? (
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <h3 className="text-2xl font-semibold text-[#0A2540] mb-6">Edit Profile Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        value={profile.name} 
                        onChange={(e) => handleProfileChange('name', e.target.value)} 
                        className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        value={profile.email} 
                        onChange={(e) => handleProfileChange('email', e.target.value)} 
                        className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        value={profile.phone} 
                        onChange={(e) => handleProfileChange('phone', e.target.value)} 
                        className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">City/Location *</label>
                      <input 
                        type="text" 
                        value={profile.location} 
                        onChange={(e) => handleProfileChange('location', e.target.value)} 
                        className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" 
                      />
                    </div>

                    <button onClick={saveProfile} className="w-full bg-[#0A2540] hover:bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                      <Save size={20} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Account Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-[#FF9933]/10 to-[#FF9933]/5 rounded-2xl p-5 border border-[#FF9933]/20">
                        <p className="text-gray-600 text-sm">Total Cases Filed</p>
                        <p className="text-4xl font-bold text-[#0A2540] mt-2">24</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#138808]/10 to-[#138808]/5 rounded-2xl p-5 border border-[#138808]/20">
                        <p className="text-gray-600 text-sm">Cases Resolved</p>
                        <p className="text-4xl font-bold text-[#0A2540] mt-2">17</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Connected Professionals</h3>
                    <div className="space-y-3">
                      {['Adv. Rajesh Kumar', 'Adv. Priya Singh', 'Adv. Amit Patel'].map((lawyer, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:border-[#FF9933] transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#FF9933] rounded-full flex items-center justify-center text-white font-bold">{lawyer.charAt(0)}</div>
                            <span className="font-medium text-[#0A2540]">{lawyer}</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Connected</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* File New Case Tab - Same as before */}
        {activeTab === 'case' && (
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#0A2540] mb-8">File a New Legal Case</h2>

            <form className="space-y-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Case Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g., Unpaid Salary for 3 Months" 
                  value={caseForm.caseTitle} 
                  onChange={(e) => handleCaseChange('caseTitle', e.target.value)} 
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" 
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Case Category <span className="text-red-500">*</span></label>
                <select 
                  value={caseForm.caseCategory} 
                  onChange={(e) => handleCaseChange('caseCategory', e.target.value)} 
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Case Description <span className="text-red-500">*</span></label>
                <textarea 
                  placeholder="Explain your case in detail..." 
                  value={caseForm.caseDescription} 
                  onChange={(e) => handleCaseChange('caseDescription', e.target.value)} 
                  rows="6" 
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20 resize-none" 
                />
              </div>

              <div className="border-t-2 border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-[#0A2540] mb-6">Opposite Party Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Opposite Party Name</label>
                    <input type="text" placeholder="Person/Company Name" value={caseForm.oppositePerson} onChange={(e) => handleCaseChange('oppositePerson', e.target.value)} className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={caseForm.oppositePersonPhone} onChange={(e) => handleCaseChange('oppositePersonPhone', e.target.value)} className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-700 font-semibold mb-2">Address</label>
                  <input type="text" placeholder="Full address of opposite party" value={caseForm.oppositePersonAddress} onChange={(e) => handleCaseChange('oppositePersonAddress', e.target.value)} className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" />
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-[#0A2540] mb-6">Additional Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Claim Amount (₹)</label>
                    <input type="number" placeholder="Enter amount" value={caseForm.amount} onChange={(e) => handleCaseChange('amount', e.target.value)} className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Urgency Level</label>
                    <select value={caseForm.urgency} onChange={(e) => handleCaseChange('urgency', e.target.value)} className="w-full px-5 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/20">
                      <option value="low">Low - Normal</option>
                      <option value="medium">Medium - Important</option>
                      <option value="high">High - Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-700 font-semibold mb-2">Upload Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#FF9933] transition-all">
                    <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">Drag & drop or click to upload</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB)</p>
                    <input type="file" onChange={handleFileUpload} className="hidden" id="caseFile" />
                    <label htmlFor="caseFile" className="mt-4 inline-block px-6 py-2.5 bg-[#FF9933] text-white rounded-xl cursor-pointer hover:bg-orange-600 transition">
                      Choose File
                    </label>
                    {caseForm.caseDocuments && <p className="mt-3 text-green-600 font-medium">✓ {caseForm.caseDocuments}</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button type="button" onClick={submitCase} className="flex-1 bg-[#0A2540] hover:bg-black text-white py-4 rounded-2xl font-semibold transition-all shadow-lg">
                  File Case Now
                </button>
                <button type="button" onClick={() => setCaseForm({caseTitle:'', caseCategory:'', caseDescription:'', oppositePerson:'', oppositePersonPhone:'', oppositePersonAddress:'', caseDocuments:'', amount:'', urgency:'medium'})} className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#0A2540] py-4 rounded-2xl font-semibold transition-all">
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;