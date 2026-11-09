import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Shield, PlusCircle, Bell, LogOut, User, FileText, Users, 
  Clock, CheckCircle, AlertCircle, Download, Home, BookOpen, Timer, 
  Upload, X 
} from 'lucide-react';

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();

  // Dynamic User from Login
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const userName = currentUser?.fullName || currentUser?.name || "User";
  const userInitial = userName[0]?.toUpperCase() || "A";

  const [newDoc, setNewDoc] = useState({
    name: "",
    category: "Labour Law",
    related: ""
  });

  const [uploading, setUploading] = useState(false);

  // ===================== NOTIFICATIONS =====================
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "update",
      title: "Case Update: Salary Dispute",
      message: "Your lawyer has submitted the rejoinder. Next hearing on 05 June 2026.",
      time: "2 hours ago",
      read: false,
      icon: Clock
    },
    {
      id: 2,
      type: "alert",
      title: "Document Request",
      message: "Lawyer needs your employment contract copy for filing.",
      time: "Yesterday",
      read: false,
      icon: AlertCircle
    },
    {
      id: 3,
      type: "success",
      title: "Complaint Resolved",
      message: "Your consumer complaint against XYZ Electronics has been settled.",
      time: "3 days ago",
      read: true,
      icon: CheckCircle
    },
    {
      id: 4,
      type: "reminder",
      title: "Hearing Reminder",
      message: "Tenant eviction case hearing tomorrow at 11:00 AM - Delhi District Court.",
      time: "4 days ago",
      read: true,
      icon: Timer
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };
  // =======================================================

  // ===================== REAL UPLOAD FUNCTION =====================
  const handleUpload = async (e) => {
    e.preventDefault();
    
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("✅ Document uploaded successfully!");
      setShowUploadModal(false);
      setNewDoc({ name: "", category: "Labour Law", related: "" });
      fileInput.value = '';

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  // ================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex">
      
      {/* Sidebar - Unchanged */}
      <div className="w-64 bg-[#0A2540] text-white min-h-screen p-4 fixed">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-8 h-8 text-[#FF9933]" />
          <h1 className="text-2xl font-semibold">NyayaSathi</h1>
        </div>

        <nav className="space-y-1">
          {[
            { name: "Dashboard", active: true, path: "/dashboard", icon: Home },
            { name: "My Cases", path: "/mycases", icon: FileText },
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
          <div onClick={() => navigate('/profile')} className="bg-white/10 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-white/20">
            <div className="w-8 h-8 bg-[#FF9933] text-black rounded-full flex items-center justify-center font-bold text-sm">
              {userInitial}
            </div>
            <div>
              <p className="font-medium text-sm">{userName}</p>
              <p className="text-xs text-gray-400">Delhi</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="mt-4 w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-500 py-2">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content - Fully Preserved */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-[#0A2540]">
                Welcome back, {userName.split(" ")[0]} 👋
              </h1>
              <p className="text-gray-700 mt-1">Manage your legal matters efficiently</p>
            </div>

            <div className="flex items-center gap-6">
              {/* Bell Icon */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)} 
                className="relative p-3 hover:bg-white/80 rounded-2xl transition"
              >
                <Bell size={26} className="text-[#0A2540]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-medium text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div onClick={() => navigate('/profile')} className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all">
                <User size={24} className="text-[#0A2540]" />
                <div className="text-right">
                  <p className="font-medium text-[#0A2540]">{userName}</p>
                  <p className="text-xs text-gray-500">Member since 2026</p>
                </div>
              </div>
            </div>
          </div>

          <Link to="/" className="inline-flex items-center gap-2 bg-[#0A2540] hover:bg-black text-white px-6 py-3 rounded-2xl text-base font-medium mb-8 transition-all hover:scale-[1.02] shadow-lg">
            <PlusCircle size={24} />
            Analyze New Legal Problem
          </Link>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Cases", value: "24", color: "text-[#0A2540]" },
              { label: "Pending", value: "07", color: "text-orange-600" },
              { label: "Resolved", value: "17", color: "text-green-600" },
              { label: "Lawyers Connected", value: "03", color: "text-[#FF9933]" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className={`text-4xl font-bold mt-3 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-5 text-[#0A2540]">Recent Cases</h2>
              <div className="space-y-3">
                {[
                  { title: "Salary Not Paid by Company", category: "Labour Law", time: "2 days ago", status: "Pending" },
                  { title: "Illegal Eviction by Landlord", category: "Tenant Rights", time: "1 week ago", status: "In Progress" },
                  { title: "Defective Product Complaint", category: "Consumer Protection", time: "15 days ago", status: "Resolved" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 border border-gray-100 rounded-2xl hover:border-[#FF9933] transition-all">
                    <div>
                      <p className="font-medium text-base">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.category} • {item.time}</p>
                    </div>
                    <span className={`px-4 py-1.5 text-xs font-medium rounded-full ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' : item.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-5 text-[#0A2540] text-lg">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => setShowUploadModal(true)} className="w-full flex items-center gap-4 p-4 border border-gray-200 hover:border-[#FF9933] rounded-2xl hover:bg-[#FF9933]/5 transition-all">
                    <div className="w-11 h-11 bg-orange-50 rounded-2xl flex items-center justify-center">
                      <Upload size={24} className="text-[#FF9933]" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Upload Documents</p>
                      <p className="text-sm text-gray-500">Securely store your legal files</p>
                    </div>
                  </button>

                  <button onClick={() => navigate('/findlawyers')} className="w-full flex items-center gap-4 p-4 border border-gray-200 hover:border-[#FF9933] rounded-2xl hover:bg-[#FF9933]/5 transition-all">
                    <div className="w-11 h-11 bg-orange-50 rounded-2xl flex items-center justify-center">
                      <Users size={24} className="text-[#FF9933]" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Consult Lawyer</p>
                      <p className="text-sm text-gray-500">Connect with verified advocates</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== NOTIFICATION MODAL ==================== */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-end pt-20 pr-8">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center bg-[#0A2540] text-white rounded-t-3xl">
              <div>
                <h2 className="text-xl font-semibold">Notifications</h2>
                <p className="text-sm text-gray-300">Stay updated with your cases</p>
              </div>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full transition"
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={() => setShowNotifications(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[65vh] overflow-y-auto">
              {notifications.map((notif) => {
                const IconComponent = notif.icon;
                return (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`p-5 border-b hover:bg-gray-50 cursor-pointer transition-all ${!notif.read ? 'bg-orange-50' : ''}`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0
                        ${notif.type === 'success' ? 'bg-green-100 text-green-600' : 
                          notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-[#FF9933]'}`}>
                        <IconComponent size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0A2540] pr-2">{notif.title}</p>
                        <p className="text-sm text-gray-600 mt-1 leading-snug">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                      </div>
                      {!notif.read && <div className="w-2 h-2 bg-[#FF9933] rounded-full mt-2 flex-shrink-0"></div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-center bg-gray-50 rounded-b-3xl">
              <button 
                onClick={() => {
                  setShowNotifications(false);
                  navigate('/reminders');
                }}
                className="text-[#FF9933] hover:text-orange-600 font-medium text-sm"
              >
                View All Notifications →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal - Unchanged */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Upload New Document</h2>
              <button onClick={() => setShowUploadModal(false)}><X size={28} /></button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-5">
              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center cursor-pointer hover:border-[#FF9933]">
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="font-medium">Click to upload document</p>
                <input type="file" className="hidden" onChange={(e) => {
                  if (e.target.files[0]) setNewDoc(prev => ({...prev, name: e.target.files[0].name}));
                }} />
              </label>

              {newDoc.name && <p className="text-center text-green-600">Selected: {newDoc.name}</p>}

              <button 
                type="submit" 
                disabled={uploading}
                className="w-full bg-[#FF9933] hover:bg-[#e88a2e] py-4 rounded-2xl font-semibold text-black disabled:opacity-70"
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;