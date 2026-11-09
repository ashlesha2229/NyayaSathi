import { useState } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';

const BookingModal = ({ lawyer, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [problem, setProblem] = useState("");

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBook = () => {
    if (!selectedDate || !selectedTime || !problem.trim()) {
      alert("Please fill all fields");
      return;
    }
    
    alert(`✅ Booking Confirmed!\n\nLawyer: ${lawyer.name}\nDate: ${selectedDate}\nTime: ${selectedTime}\nFee: ₹${lawyer.fee}`);
    onClose();
    
    // Yahan baad mein real backend call kar sakte ho
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0A2540] text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Book Consultation</h2>
            <p className="text-sm text-gray-300 mt-1">With {lawyer.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Lawyer Info */}
          <div className="flex gap-4 bg-gray-50 p-4 rounded-2xl">
            <img 
              src={lawyer.photo} 
              alt={lawyer.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <p className="font-semibold text-lg">{lawyer.name}</p>
              <p className="text-sm text-gray-600">{lawyer.specialization} • {lawyer.experience} years exp.</p>
              <p className="text-[#FF9933] font-semibold mt-1">₹{lawyer.fee} / consultation</p>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={18} /> Select Date
            </label>
            <input
              type="date"
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933]"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Clock size={18} /> Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-2xl text-sm font-medium transition-all
                    ${selectedTime === time 
                      ? 'bg-[#FF9933] text-black' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your legal problem
            </label>
            <textarea
              rows={4}
              placeholder="Briefly explain your issue..."
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF9933] resize-none"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleBook}
            className="flex-1 py-3.5 bg-[#FF9933] hover:bg-[#e88a2e] text-black font-semibold rounded-2xl transition-all"
          >
            Confirm Booking - ₹{lawyer.fee}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;