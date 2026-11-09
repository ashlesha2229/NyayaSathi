import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Home, FileText, Users, Download, BookOpen, Timer, 
  LogOut, Star, MapPin, Clock, CheckCircle, Phone, MessageCircle, X, Calendar 
} from 'lucide-react';
import { lawyers } from '../data/lawyers';

const FindLawyers = () => {
  const navigate = useNavigate();

  // Dynamic User from Login (Same as other pages)
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const userName = currentUser?.fullName || currentUser?.name || "User";
  const userInitial = userName[0]?.toUpperCase() || "A";
  
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  const specializations = ["All", "Criminal Law", "Family Law", "Civil Law", "Labour Law", 
                          "Consumer Law", "Corporate Law", "Property Law"];
  const locations = ["All", "Delhi", "Noida", "Gurgaon", "Faridabad"];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchSearch = lawyer.name.toLowerCase().includes(search.toLowerCase());
    const matchSpec = selectedSpec === "All" || lawyer.specialization === selectedSpec;
    const matchLoc = selectedLocation === "All" || lawyer.location === selectedLocation;
    return matchSearch && matchSpec && matchLoc;
  });

  const handleConsult = (lawyer) => {
    setSelectedLawyer(lawyer);
    setIsBooked(false);
    setMessage("");
  };

  const closeModal = () => {
    setSelectedLawyer(null);
    setIsBooked(false);
    setShowMessageModal(false);
  };

  const handleBookConsultation = () => {
    const details = {
      lawyer: selectedLawyer,
      date: "20 May 2026",
      time: "11:00 AM",
      fee: selectedLawyer.fee
    };
    
    setBookingDetails(details);
    setIsBooked(true);
  };

  // Add to Calendar Function
  const addToCalendar = () => {
    const event = {
      title: `Consultation with ${bookingDetails.lawyer.name}`,
      start: "20260520T110000",
      end: "20260520T120000",
      description: `Legal Consultation - NyayaSathi\nFee: ₹${bookingDetails.fee}`,
      location: bookingDetails.lawyer.location
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NyayaSathi//Consultation//EN
BEGIN:VEVENT
UID:${Date.now()}@nyayasathi.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Consultation_${bookingDetails.lawyer.name.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("✅ Calendar event downloaded! Import it into Google Calendar / Outlook.");
  };

  // Send Message Function
  const sendMessage = () => {
    if (message.trim()) {
      alert(`✅ Message sent to ${selectedLawyer.name}!\n\nYour message: "${message}"`);
      setMessage("");
      setShowMessageModal(false);
    } else {
      alert("Please type a message");
    }
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
            { name: "Find Lawyers", path: "/findlawyers", icon: Users, active: true },
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

      {/* Main Content - Unchanged */}
      <div className="ml-64 flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#0A2540]">Find Lawyers</h1>
            <p className="text-gray-600 mt-1">Expert legal help at your fingertips</p>
          </div>

          {/* Filters */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm p-5 mb-8 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Search by name..."
                className="px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF9933] bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select 
                className="px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF9933] bg-white"
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
              >
                {specializations.map(spec => <option key={spec} value={spec}>{spec}</option>)}
              </select>
              <select 
                className="px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF9933] bg-white"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          <p className="text-gray-600 mb-6 px-2 font-medium">{filteredLawyers.length} lawyers found</p>

          {/* Lawyers List */}
          <div className="space-y-4">
            {filteredLawyers.map(lawyer => (
              <div 
                key={lawyer.id} 
                className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-gray-100 p-5 flex items-center gap-5 transition-all hover:-translate-x-1 cursor-pointer"
                onClick={() => handleConsult(lawyer)}
              >
                <img src={lawyer.photo} alt={lawyer.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-[#0A2540]">{lawyer.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Star className="text-yellow-500" size={17} fill="currentColor" />
                        <span className="font-medium">{lawyer.rating}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{lawyer.experience} years experience</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Fee</p>
                      <p className="text-2xl font-bold text-[#0A2540]">₹{lawyer.fee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5"><MapPin size={17} /> {lawyer.location}</div>
                    <div className="flex items-center gap-1.5"><Clock size={17} /> {lawyer.availability}</div>
                    <span className="bg-[#FF9933]/10 text-[#FF9933] px-3 py-1 rounded-xl text-sm font-medium">{lawyer.specialization}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleConsult(lawyer); }}
                    className="bg-[#FF9933] hover:bg-[#e88a2e] text-black px-6 py-2.5 rounded-2xl font-medium text-sm transition-all"
                  >
                    Consult Now
                  </button>
                  <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                    <CheckCircle size={17} /> Verified
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================== CONSULTATION MODAL ====================== */}
      {selectedLawyer && !showMessageModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">

            {isBooked ? (
              /* Success Screen */
              <div className="p-10 text-center">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={60} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-semibold text-green-700 mb-2">Consultation Booked!</h2>
                <p className="text-gray-600 mb-8">Your consultation has been successfully scheduled.</p>

                <div className="bg-gray-50 rounded-2xl p-5 text-left mb-8">
                  <p className="font-medium mb-3">Booking Details</p>
                  <p><strong>Lawyer:</strong> {bookingDetails.lawyer.name}</p>
                  <p><strong>Date:</strong> {bookingDetails.date}</p>
                  <p><strong>Time:</strong> {bookingDetails.time}</p>
                  <p><strong>Amount:</strong> ₹{bookingDetails.fee}</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/mycases')}
                    className="w-full bg-[#0A2540] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-black"
                  >
                    <FileText size={20} />
                    View in My Cases
                  </button>

                  <button 
                    onClick={addToCalendar}
                    className="w-full border border-gray-300 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                  >
                    <Calendar size={20} />
                    Add to Calendar
                  </button>

                  <button 
                    onClick={() => setShowMessageModal(true)}
                    className="w-full border border-gray-300 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                  >
                    <MessageCircle size={20} />
                    Message Lawyer
                  </button>

                  <button onClick={closeModal} className="w-full text-gray-500 py-3 hover:text-gray-700">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Modal */
              <>
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-2xl font-semibold">Consult with {selectedLawyer.name}</h2>
                  <button onClick={closeModal}><X size={28} className="text-gray-400 hover:text-gray-600" /></button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <img src={selectedLawyer.photo} alt={selectedLawyer.name} className="w-24 h-24 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-xl font-semibold">{selectedLawyer.name}</h3>
                      <p className="text-[#FF9933]">{selectedLawyer.specialization}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="text-yellow-500 fill-yellow-500" size={20} />
                        <span className="font-semibold">{selectedLawyer.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><p className="text-gray-500">Location</p><p className="font-medium">{selectedLawyer.location}</p></div>
                    <div><p className="text-gray-500">Experience</p><p className="font-medium">{selectedLawyer.experience} Years</p></div>
                    <div><p className="text-gray-500">Fee</p><p className="text-2xl font-bold">₹{selectedLawyer.fee}</p></div>
                    <div><p className="text-gray-500">Availability</p><p className="font-medium">{selectedLawyer.availability}</p></div>
                  </div>
                </div>

                <div className="p-6 border-t">
                  <button 
                    onClick={handleBookConsultation}
                    className="w-full bg-[#FF9933] hover:bg-[#e88a2e] text-black py-4 rounded-2xl font-semibold text-lg"
                  >
                    Book Consultation - ₹{selectedLawyer.fee}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ====================== MESSAGE MODAL ====================== */}
      {showMessageModal && selectedLawyer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Message {selectedLawyer.name}</h2>
              <button onClick={() => setShowMessageModal(false)}><X size={24} /></button>
            </div>

            <div className="p-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-40 p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF9933] resize-none"
              />
            </div>

            <div className="p-6 border-t flex gap-3">
              <button 
                onClick={() => setShowMessageModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-2xl"
              >
                Cancel
              </button>
              <button 
                onClick={sendMessage}
                className="flex-1 py-3 bg-[#0A2540] text-white rounded-2xl font-medium"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindLawyers;