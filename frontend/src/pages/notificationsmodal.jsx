import { X, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const NotificationsModal = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'case',
      title: 'Your case "Salary Not Paid by Company" has been updated',
      time: '2 hours ago',
      status: 'update',
      read: false,
    },
    {
      id: 2,
      type: 'lawyer',
      title: 'Adv. Rajesh Kumar accepted your consultation request',
      time: '5 hours ago',
      status: 'success',
      read: false,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Document upload deadline for "Illegal Eviction" case tomorrow',
      time: 'Yesterday',
      status: 'warning',
      read: true,
    },
    {
      id: 4,
      type: 'system',
      title: 'Your complaint under Labour Law has been successfully filed',
      time: '3 days ago',
      status: 'success',
      read: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-end pt-20 pr-8">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold text-[#0A2540]">Notifications</h2>
            <p className="text-sm text-gray-500">Stay updated with your legal matters</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-6 border-b hover:bg-gray-50 transition-all cursor-pointer ${
                  !notif.read ? 'bg-orange-50' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    {notif.status === 'success' && <CheckCircle className="text-green-500" size={24} />}
                    {notif.status === 'warning' && <AlertCircle className="text-amber-500" size={24} />}
                    {notif.status === 'update' && <Clock className="text-blue-500" size={24} />}
                  </div>

                  <div className="flex-1">
                    <p className={`font-medium ${!notif.read ? 'text-[#0A2540]' : 'text-gray-700'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock size={14} /> {notif.time}
                    </p>
                  </div>

                  {!notif.read && (
                    <div className="w-2 h-2 bg-[#FF9933] rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              No new notifications
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-between text-sm">
          <button className="text-[#FF9933] hover:underline font-medium">
            Mark all as read
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;