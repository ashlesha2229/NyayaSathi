import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, FileText, Users, Download, BookOpen, Timer, Bell, User, LogOut, PlusCircle, Edit3, Trash2, Clock } from 'lucide-react';

const SavedComplaints = () => {
  const navigate = useNavigate();

  // Dynamic User from Login (Same as Dashboard & MyCases)
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const userName = currentUser?.fullName || currentUser?.name || "User";
  const userInitial = userName[0]?.toUpperCase() || "A";

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Salary Not Paid by Company",
      category: "Labour Law",
      lastEdited: "2 days ago",
      status: "Draft",
      progress: 60,
    },
    {
      id: 2,
      title: "Illegal Eviction Notice by Landlord",
      category: "Tenant Rights",
      lastEdited: "5 days ago",
      status: "Draft",
      progress: 30,
    },
    {
      id: 3,
      title: "Defective Mobile Phone Complaint",
      category: "Consumer Protection",
      lastEdited: "1 week ago",
      status: "Draft",
      progress: 85,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      setComplaints(complaints.filter(item => item.id !== id));
    }
  };

  const handleContinue = (complaint) => {
    navigate('/complaintform', { state: complaint });
  };

  const handleEdit = (complaint) => {
    alert(`Editing: "${complaint.title}"`);
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
            { name: "My Cases", path: "/mycases", icon: FileText },
            { name: "Saved Complaints", path: "/savedcomplaints", icon: FileText, active: true },
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-[#0A2540]">Saved Complaints</h1>
              <p className="text-gray-600 mt-1">Continue your unfinished complaints</p>
            </div>
            
            <button 
              onClick={() => alert("New Complaint Form khulega")}
              className="flex items-center gap-2 bg-[#0A2540] text-white px-6 py-3 rounded-2xl hover:bg-black transition-all"
            >
              <PlusCircle size={22} />
              New Complaint
            </button>
          </div>

          {complaints.length === 0 ? (
            <div className="text-center py-20">
              <FileText size={60} className="mx-auto text-gray-300" />
              <p className="text-xl text-gray-500 mt-4">No saved drafts yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaints.map((complaint) => (
                <div 
                  key={complaint.id} 
                  className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-3 py-1 bg-orange-100 text-[#FF9933] text-xs font-medium rounded-full">
                          {complaint.category}
                        </span>
                        <h3 className="font-semibold text-lg mt-3 text-[#0A2540] line-clamp-2">
                          {complaint.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      Last edited: {complaint.lastEdited}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{complaint.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-2 bg-[#FF9933] rounded-full transition-all"
                          style={{ width: `${complaint.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex gap-3">
                    <button
                      onClick={() => handleContinue(complaint)}
                      className="flex-1 bg-[#FF9933] hover:bg-[#e88a2e] text-black font-semibold py-3 rounded-2xl transition-all text-sm"
                    >
                      Continue
                    </button>
                    
                    <button
                      onClick={() => handleEdit(complaint)}
                      className="p-3 border border-gray-300 hover:bg-gray-100 rounded-2xl transition-all"
                    >
                      <Edit3 size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="p-3 border border-gray-300 hover:bg-red-50 hover:text-red-600 text-gray-600 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedComplaints;