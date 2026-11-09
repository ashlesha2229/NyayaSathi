import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Home, FileText, Users, Download, BookOpen, Timer, 
  LogOut, Bell, Calendar, Clock, AlertTriangle, CheckCircle, 
  Check, X, Plus 
} from 'lucide-react';

const Reminders = () => {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Court Hearing - Salary Dispute",
      description: "Hearing for unpaid salary case against TechCorp Ltd.",
      date: "2026-05-15",
      time: "10:00 AM",
      type: "Court Hearing",
      priority: "High",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Document Submission Deadline",
      description: "Submit evidence documents for tenant rights case",
      date: "2026-05-18",
      time: "5:00 PM",
      type: "Deadline",
      priority: "Medium",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Lawyer Consultation",
      description: "Follow-up meeting with Adv. Sharma regarding property dispute",
      date: "2026-05-20",
      time: "2:30 PM",
      type: "Meeting",
      priority: "Medium",
      status: "Upcoming"
    },
    {
      id: 4,
      title: "File RTI Application",
      description: "Submit RTI for accessing public records related to land dispute",
      date: "2026-05-12",
      time: "11:00 AM",
      type: "Application",
      priority: "Low",
      status: "Overdue"
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "Meeting",
    priority: "Medium"
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Overdue': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleRemoveReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleMarkAsDone = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, status: 'Completed' } : reminder
    ));
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.date || !newReminder.time) {
      alert("Please fill all required fields");
      return;
    }

    const reminderToAdd = {
      id: Date.now(),
      ...newReminder,
      status: "Upcoming"
    };

    setReminders([reminderToAdd, ...reminders]);
    setShowAddModal(false);
    
    // Reset form
    setNewReminder({
      title: "",
      description: "",
      date: "",
      time: "",
      type: "Meeting",
      priority: "Medium"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0A2540] text-white min-h-screen p-4 fixed">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-8 h-8 text-[#FF9933]" />
          <h1 className="text-2xl font-semibold">NyayaSathi</h1>
        </div>

        <nav className="space-y-1">
          {[
            { name: "Dashboard", path: "/dashboard", icon: Home },
            { name: "My Cases", path: "/mycases", icon: FileText },
            { name: "Saved Complaints", path: "/savedcomplaints", icon: FileText },
            { name: "Find Lawyers", path: "/findlawyers", icon: Users },
            { name: "Saved Documents", path: "/saveddocuments", icon: Download },
            { name: "Law Library", path: "/lawlibrary", icon: BookOpen },
            { name: "Reminders", path: "/reminders", icon: Timer, active: true },
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
            <div className="w-8 h-8 bg-[#FF9933] text-black rounded-full flex items-center justify-center font-bold text-sm">AS</div>
            <div>
              <p className="font-medium text-sm">Ashlesha Sharma</p>
              <p className="text-xs text-gray-400">Delhi</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="mt-4 w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-500 py-2">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Bell className="w-9 h-9 text-[#FF9933]" />
              <div>
                <h1 className="text-4xl font-bold text-[#0A2540]">Reminders</h1>
                <p className="text-gray-600 mt-1">Never miss important legal dates</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#0A2540] hover:bg-black text-white px-6 py-3.5 rounded-2xl font-medium flex items-center gap-2 transition-all shadow-lg"
            >
              <Plus size={20} />
              Add New Reminder
            </button>
          </div>

          {/* Reminders List */}
          {reminders.length === 0 ? (
            <div className="bg-white rounded-3xl py-20 text-center shadow-sm">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-semibold text-[#0A2540]">All Clear!</h2>
              <p className="text-gray-600 mt-3 text-lg">You have no pending reminders.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-7 flex items-start gap-5">
                    <div className="mt-1">
                      {getStatusIcon(reminder.status)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-[#0A2540]">{reminder.title}</h3>
                            <span className={`px-4 py-1 text-xs font-medium rounded-full border ${getPriorityColor(reminder.priority)}`}>
                              {reminder.priority}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2 leading-relaxed">{reminder.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mt-5 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={18} />
                          <span>{new Date(reminder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={18} />
                          <span>{reminder.time}</span>
                        </div>
                        <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium">
                          {reminder.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <span className={`px-4 py-1.5 text-sm font-medium rounded-2xl ${
                        reminder.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        reminder.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {reminder.status}
                      </span>

                      <div className="flex gap-3">
                        {reminder.status !== 'Completed' && (
                          <button
                            onClick={() => handleMarkAsDone(reminder.id)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-sm font-medium transition-all"
                          >
                            <Check size={18} /> Mark Done
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveReminder(reminder.id)}
                          className="flex items-center gap-2 px-5 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-2xl text-sm font-medium transition-all"
                        >
                          <X size={18} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ====================== ADD NEW REMINDER MODAL ====================== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold text-[#0A2540]">Add New Reminder</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleAddReminder} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                  placeholder="e.g. Court Hearing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none h-24 resize-y"
                  placeholder="Add more details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newReminder.date}
                    onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                  >
                    <option value="Court Hearing">Court Hearing</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Application">Application</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newReminder.priority}
                    onChange={(e) => setNewReminder({...newReminder, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#FF9933] hover:bg-[#e88a2e] text-black rounded-2xl font-semibold transition-all"
                >
                  Add Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;