import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, FileText, Users, Download, BookOpen, Timer, Bell, User, LogOut, Calendar, X, Upload, MessageCircle, Phone } from 'lucide-react';

const MyCases = () => {
  const navigate = useNavigate();

  // Dynamic User from Login (Same as Dashboard)
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const userName = currentUser?.fullName || currentUser?.name || "User";
  const userInitial = userName[0]?.toUpperCase() || "A";

  const [filter, setFilter] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [currentCase, setCurrentCase] = useState(null);

  const [cases] = useState([
    {
      id: 1,
      title: "Salary Not Paid by Company",
      category: "Labour Law",
      status: "In Progress",
      date: "10 May 2026",
      lawyer: "Adv. Rajesh Kumar Sharma",
      progress: 65,
      description: "Company has not paid 3 months salary despite repeated reminders. I am working as Senior Software Engineer at TechSolutions Pvt Ltd, Pune.",
      nextHearing: "25 May 2026",
      documents: 7,
    },
    {
      id: 2,
      title: "Illegal Eviction by Landlord",
      category: "Tenant Rights",
      status: "Pending",
      date: "5 May 2026",
      lawyer: "Not Assigned",
      progress: 25,
      description: "Landlord is trying to evict me without following legal procedure.",
      nextHearing: "18 May 2026",
      documents: 4,
    },
    {
      id: 3,
      title: "Defective Product Complaint - Samsung Mobile",
      category: "Consumer Protection",
      status: "Resolved",
      date: "18 April 2026",
      lawyer: "Adv. Priya Malhotra",
      progress: 100,
      description: "Samsung Galaxy S23 started giving display issues within 3 months.",
      nextHearing: "N/A",
      documents: 12,
    },
  ]);

  const filteredCases = cases.filter(c => filter === "All" || c.status === filter);

  const getStatusColor = (status) => {
    if (status === "Resolved") return "bg-green-100 text-green-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    if (status === "Pending") return "bg-orange-100 text-orange-700";
    return "bg-gray-100";
  };

  const openAction = (caseItem) => {
    setCurrentCase(caseItem);
    setActionModal('menu');
  };

  const openSpecificAction = (action) => {
    setActionModal(action);
  };

  const closeModal = () => {
    setActionModal(null);
    setCurrentCase(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex">
      {/* Sidebar - Same as Dashboard */}
      <div className="w-64 bg-[#0A2540] text-white min-h-screen p-4 fixed">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-8 h-8 text-[#FF9933]" />
          <h1 className="text-2xl font-semibold">NyayaSathi</h1>
        </div>

        <nav className="space-y-1">
          {[
            { name: "Dashboard", path: "/dashboard", icon: Home },
            { name: "My Cases", path: "/mycases", icon: FileText, active: true },
            { name: "Saved Complaints", path: "/savedcomplaints", icon: FileText },
            { name: "Find Lawyers", path: "/findlawyers", icon: Users },
            { name: "Saved Documents", path: "/saveddocuments", icon: Download },
            { name: "Law Library", path: "/lawlibrary", icon: BookOpen },
            { name: "Reminders", path: "/reminders", icon: Timer },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`px-4 py-3 rounded-xl cursor-pointer transition-all text-sm font-medium flex items-center gap-3
                  ${item.active ? 'bg-[#FF9933] text-black font-semibold' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
              >
                <IconComponent size={18} />
                {item.name}
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div 
            onClick={() => navigate('/profile')}
            className="bg-white/10 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-all"
          >
            <div className="w-8 h-8 bg-[#FF9933] text-black rounded-full flex items-center justify-center font-bold text-sm">
              {userInitial}
            </div>
            <div>
              <p className="font-medium text-sm">{userName}</p>
              <p className="text-xs text-gray-400">Delhi</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-500 py-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content - Unchanged */}
      <div className="ml-64 flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#0A2540]">My Cases</h1>
            <p className="text-gray-600 mt-1">Track your ongoing legal matters</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 bg-white w-fit p-1 rounded-3xl shadow-sm mb-8">
            {["All", "Pending", "In Progress", "Resolved"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-3xl text-sm font-medium transition-all ${
                  filter === item ? 'bg-[#FF9933] text-black' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Cases List */}
          <div className="space-y-5">
            {filteredCases.map((caseItem) => (
              <div key={caseItem.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow transition-all border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar size={16} /> {caseItem.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mt-3">{caseItem.title}</h3>
                    <p className="text-gray-600 mt-1">{caseItem.category}</p>
                    <p className="text-gray-600 text-[15px] mt-4 leading-relaxed line-clamp-3">
                      {caseItem.description}
                    </p>
                  </div>

                  <div className="md:w-72 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF9933]/10 rounded-2xl flex items-center justify-center">
                        <User size={22} className="text-[#FF9933]" />
                      </div>
                      <div>
                        <p className="font-medium">{caseItem.lawyer}</p>
                        <p className="text-sm text-gray-500">Lawyer</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-semibold">{caseItem.progress}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-2.5 bg-[#FF9933] rounded-full" style={{ width: `${caseItem.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex gap-3">
                  <button
                    onClick={() => setSelectedCase(caseItem)}
                    className="flex-1 py-2.5 text-sm font-medium border border-gray-300 rounded-2xl hover:bg-gray-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => openAction(caseItem)}
                    className="flex-1 py-2.5 text-sm font-medium bg-[#FF9933] hover:bg-[#e88a2e] text-black rounded-2xl"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Details Modal - Unchanged */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b flex justify-between">
              <div>
                <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(selectedCase.status)}`}>{selectedCase.status}</span>
                <h2 className="text-xl font-semibold mt-2">{selectedCase.title}</h2>
              </div>
              <button onClick={() => setSelectedCase(null)}><X size={26} /></button>
            </div>
            <div className="p-5 space-y-6">
              <p className="text-gray-700 leading-relaxed">{selectedCase.description}</p>
              <div className="grid grid-cols-2 gap-y-5 text-sm">
                <div><p className="text-gray-500">Filed On</p><p>{selectedCase.date}</p></div>
                <div><p className="text-gray-500">Next Hearing</p><p>{selectedCase.nextHearing}</p></div>
                <div><p className="text-gray-500">Category</p><p>{selectedCase.category}</p></div>
                <div><p className="text-gray-500">Documents</p><p>{selectedCase.documents}</p></div>
              </div>
            </div>
            <div className="p-5 border-t">
              <button onClick={() => setSelectedCase(null)} className="w-full py-3 bg-gray-100 rounded-2xl">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modals - Unchanged */}
      {actionModal && currentCase && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Menu */}
            {actionModal === 'menu' && (
              <>
                <div className="p-5 border-b">
                  <h3 className="font-semibold text-lg">Take Action</h3>
                  <p className="text-sm text-gray-500 mt-1">{currentCase.title}</p>
                </div>
                <div className="p-3">
                  <button onClick={() => openSpecificAction('upload')} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 rounded-2xl text-left">
                    <Upload size={20} className="text-[#FF9933]" /> Upload Document
                  </button>
                  <button onClick={() => openSpecificAction('message')} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 rounded-2xl text-left">
                    <MessageCircle size={20} className="text-[#FF9933]" /> Message Lawyer
                  </button>
                  <button onClick={() => openSpecificAction('hearing')} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 rounded-2xl text-left">
                    <Calendar size={20} className="text-[#FF9933]" /> Update Next Hearing
                  </button>
                  <button onClick={() => openSpecificAction('call')} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 rounded-2xl text-left">
                    <Phone size={20} className="text-green-600" /> Request Call with Lawyer
                  </button>
                </div>
                <div className="p-4 border-t">
                  <button onClick={closeModal} className="w-full py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-2xl">Cancel</button>
                </div>
              </>
            )}

            {/* Other Action Screens */}
            {actionModal !== 'menu' && (
              <>
                <div className="p-5 border-b flex justify-between bg-gray-50">
                  <h3 className="font-semibold text-lg">
                    {actionModal === 'upload' && "Upload Document"}
                    {actionModal === 'message' && "Message Lawyer"}
                    {actionModal === 'hearing' && "Update Next Hearing"}
                    {actionModal === 'call' && "Request Call"}
                  </h3>
                  <button onClick={closeModal}><X size={24} /></button>
                </div>
                <div className="p-6">
                  {actionModal === 'upload' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-3xl py-16 text-center">
                      <Upload size={50} className="mx-auto text-[#FF9933] mb-4" />
                      <p className="font-medium">Upload Supporting Documents</p>
                      <p className="text-gray-500 mt-1">PDF, Images (Max 10MB)</p>
                      <button className="mt-8 px-10 py-3 bg-[#FF9933] text-black rounded-2xl">Choose File</button>
                    </div>
                  )}
                  {actionModal === 'message' && (
                    <div>
                      <textarea className="w-full h-40 p-4 border rounded-2xl" placeholder="Type your message..."></textarea>
                      <button className="mt-4 w-full py-3.5 bg-[#FF9933] text-black rounded-2xl font-medium">Send Message</button>
                    </div>
                  )}
                  {actionModal === 'hearing' && (
                    <div className="space-y-5">
                      <div>
                        <label className="text-sm text-gray-600">Next Hearing Date</label>
                        <input type="date" className="w-full mt-2 p-4 border rounded-2xl" />
                      </div>
                      <button className="w-full py-3.5 bg-[#FF9933] text-black rounded-2xl font-medium">Update Date</button>
                    </div>
                  )}
                  {actionModal === 'call' && (
                    <div className="text-center py-8">
                      <Phone size={60} className="mx-auto text-green-600 mb-6" />
                      <p className="text-xl font-medium">Request Call with Lawyer</p>
                      <button className="mt-10 w-full py-3.5 bg-green-600 text-white rounded-2xl font-medium">Request Call Now</button>
                    </div>
                  )}
                </div>
                <div className="p-5 border-t">
                  <button onClick={closeModal} className="w-full py-3 text-gray-600 hover:bg-gray-100 rounded-2xl">Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCases;