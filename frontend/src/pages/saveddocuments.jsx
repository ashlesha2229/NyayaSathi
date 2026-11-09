import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Home, FileText, Users, Download as DownloadIcon, BookOpen, Timer, 
  LogOut, Search, Upload, Eye, Trash2, Calendar, X 
} from 'lucide-react';

const SavedDocuments = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [documents, setDocuments] = useState([
    { id: 1, name: "Salary_Complaint_Application.pdf", type: "PDF", size: "2.4 MB", date: "2 days ago", related: "Salary Not Paid by Company", category: "Labour Law" },
    { id: 2, name: "Eviction_Notice_Reply.pdf", type: "PDF", size: "1.8 MB", date: "5 days ago", related: "Illegal Eviction Notice", category: "Tenant Rights" },
    { id: 3, name: "Defective_Mobile_Bill.jpg", type: "Image", size: "856 KB", date: "1 week ago", related: "Defective Product Complaint", category: "Consumer Protection" },
    { id: 4, name: "Aadhar_Card_Front.pdf", type: "PDF", size: "1.1 MB", date: "10 days ago", related: "General Documents", category: "Identity Proof" },
  ]);

  const [newDoc, setNewDoc] = useState({
    name: "",
    category: "Labour Law",
    related: "",
    file: null
  });

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                         doc.related.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || doc.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this document?")) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleView = (doc) => setPreviewDoc(doc);

  const handleDownload = (doc) => {
    const content = `NyayaSathi - ${doc.name}\nRelated: ${doc.related}\nCategory: ${doc.category}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const closePreview = () => setPreviewDoc(null);

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDoc(prev => ({
        ...prev,
        name: file.name,
        file: file
      }));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newDoc.name) {
      alert("Please select a file");
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: newDoc.name,
      type: newDoc.name.split('.').pop().toUpperCase(),
      size: "1.2 MB", // Demo size
      date: "Just now",
      related: newDoc.related || "General Document",
      category: newDoc.category
    };

    setDocuments([newDocument, ...documents]);
    setShowUploadModal(false);
    
    // Reset form
    setNewDoc({
      name: "",
      category: "Labour Law",
      related: "",
      file: null
    });

    alert("✅ Document uploaded successfully!");
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
            { name: "Saved Documents", path: "/saveddocuments", icon: DownloadIcon, active: true },
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
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-bold text-[#0A2540]">Saved Documents</h1>
              <p className="text-gray-600 mt-2">All your important legal documents in one secure place</p>
            </div>

            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-3 bg-[#0A2540] hover:bg-black text-white px-6 py-3.5 rounded-2xl transition-all shadow-lg"
            >
              <Upload size={22} />
              Upload New Document
            </button>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-10 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="text"
                placeholder="Search documents or related cases..."
                className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select 
              className="px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#FF9933] bg-gray-50 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Documents</option>
              <option value="Labour Law">Labour Law</option>
              <option value="Tenant Rights">Tenant Rights</option>
              <option value="Consumer Protection">Consumer Protection</option>
              <option value="Identity Proof">Identity Proof</option>
            </select>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-3xl border border-gray-100 hover:border-[#FF9933] hover:shadow-xl transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FF9933]/10 rounded-2xl flex items-center justify-center">
                      <FileText className="text-[#FF9933]" size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0A2540] text-[15.5px] leading-tight line-clamp-2">{doc.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{doc.size} • {doc.type}</p>
                    </div>
                  </div>

                  <div className="mt-6 text-sm space-y-2">
                    <p className="text-gray-600"><span className="font-medium">Related:</span> {doc.related}</p>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={17} /> Added {doc.date}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border-t px-6 py-5 flex gap-3">
                  <button onClick={() => handleView(doc)} className="flex-1 py-3.5 border border-gray-300 rounded-2xl hover:bg-white font-medium flex items-center justify-center gap-2">
                    <Eye size={19} /> View
                  </button>
                  <button onClick={() => handleDownload(doc)} className="flex-1 py-3.5 bg-[#FF9933] hover:bg-[#e88a2e] text-black rounded-2xl font-medium flex items-center justify-center gap-2">
                    <DownloadIcon size={19} /> Download
                  </button>
                  <button onClick={() => handleDelete(doc.id)} className="p-3.5 border border-gray-300 hover:bg-red-50 hover:text-red-600 rounded-2xl">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <FileText className="text-[#FF9933]" size={26} />
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-[#0A2540] line-clamp-1">{previewDoc.name}</h2>
                  <p className="text-sm text-gray-500">{previewDoc.size} • {previewDoc.type}</p>
                </div>
              </div>
              <button onClick={closePreview} className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100">
                <X size={26} />
              </button>
            </div>

            <div className="p-12 bg-gray-50 flex flex-col items-center justify-center">
              <div className="w-28 h-28 bg-white rounded-3xl shadow-md flex items-center justify-center mb-6">
                <FileText className="text-[#FF9933]" size={72} />
              </div>
              <p className="text-xl font-medium text-gray-700">Document Preview</p>
              <p className="text-gray-500 text-center mt-2 px-8">Actual PDF or image preview will be shown here in the final version.</p>
            </div>

            <div className="p-6 grid grid-cols-2 gap-y-5 text-sm">
              <div><p className="text-gray-500 text-xs">RELATED CASE</p><p className="font-medium mt-1">{previewDoc.related}</p></div>
              <div><p className="text-gray-500 text-xs">CATEGORY</p><p className="font-medium mt-1">{previewDoc.category}</p></div>
              <div><p className="text-gray-500 text-xs">ADDED ON</p><p className="font-medium mt-1">{previewDoc.date}</p></div>
              <div><p className="text-gray-500 text-xs">FILE SIZE</p><p className="font-medium mt-1">{previewDoc.size}</p></div>
            </div>

            <div className="p-6 border-t">
              <button onClick={closePreview} className="w-full border border-gray-300 py-4 rounded-2xl font-medium hover:bg-gray-50">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== UPLOAD MODAL ====================== */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold">Upload New Document</h2>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Document</label>
                <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF9933] transition-all">
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="font-medium text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB)</p>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                </label>
                {newDoc.name && <p className="text-sm text-green-600 mt-2 text-center">Selected: {newDoc.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({...newDoc, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                >
                  <option value="Labour Law">Labour Law</option>
                  <option value="Tenant Rights">Tenant Rights</option>
                  <option value="Consumer Protection">Consumer Protection</option>
                  <option value="Identity Proof">Identity Proof</option>
                  <option value="Property Law">Property Law</option>
                  <option value="Family Law">Family Law</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Case (Optional)</label>
                <input
                  type="text"
                  value={newDoc.related}
                  onChange={(e) => setNewDoc({...newDoc, related: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none"
                  placeholder="e.g. Salary Dispute Case"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#FF9933] hover:bg-[#e88a2e] text-black rounded-2xl font-semibold transition-all"
                >
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedDocuments;