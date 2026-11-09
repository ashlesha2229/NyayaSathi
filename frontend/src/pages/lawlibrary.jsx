import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Home, FileText, Users, Download, BookOpen, Timer, 
  LogOut, Search, ChevronDown, CheckCircle, AlertCircle 
} from 'lucide-react';

const LawLibrary = () => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLaw, setExpandedLaw] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const laws = [
    { id: 1, category: 'Labour', title: 'Minimum Wages Act, 1948', description: 'Ensures workers receive minimum wages', severity: 'small', details: 'यह कानून यह सुनिश्चित करता है कि मजदूरों को न्यूनतम मजदूरी मिले। प्रत्येक राज्य में अलग-अलग न्यूनतम मजदूरी है।', guides: ['अपने राज्य की न्यूनतम मजदूरी जानें', 'अगर मजदूरी कम दी जा रही है तो शिकायत दर्ज करें', 'श्रम विभाग से संपर्क करें'] },
    { id: 2, category: 'Labour', title: 'Payment of Gratuity Act, 1972', description: 'Regulates payment of gratuity to workers', severity: 'small', details: 'यह कानून 5 साल या उससे अधिक समय तक काम करने वाले मजदूरों को ग्रेच्युटी देने की व्यवस्था करता है।', guides: ['नौकरी छोड़ने पर ग्रेच्युटी का दावा करें', 'सही राशि की गणना करें (15 दिन की मजदूरी × साल की संख्या)', 'नियोक्ता से लिखित में मांग करें'] },
    { id: 3, category: 'Labour', title: 'Industrial Disputes Act, 1947', description: 'Handles disputes between employers and workers', severity: 'medium', details: 'यह कानून मालिक और मजदूरों के बीच विवाद सुलझाने का तरीका बताता है।', guides: ['विवाद के बारे में लिखित शिकायत दाखिल करें', 'यूनियन की मदद लें', 'श्रम न्यायालय जाएं'] },
    { id: 4, category: 'Consumer', title: 'Consumer Protection Act, 2019', description: 'Protects consumer rights', severity: 'small', details: 'यह कानून खरीदारों को धोखा-धड़ी से बचाता है। खराब सामान मिलने पर इसके तहत शिकायत कर सकते हैं।', guides: ['खराब सामान का बिल रखें', 'राष्ट्रीय उपभोक्ता हेल्पलाइन: 1800-11-4000', 'शिकायत ऑनलाइन या ऑफलाइन दर्ज करें'] },
    { id: 5, category: 'Property', title: 'Transfer of Property Act, 1882', description: 'Governs property transfer and ownership', severity: 'medium', details: 'यह कानून संपत्ति खरीदना, बेचना और देने के नियम बताता है।', guides: ['खरीदारी से पहले ज़मीन के दस्तावेज़ देखें', 'रजिस्ट्रार से संपत्ति रजिस्ट्रेशन करवाएं', 'वकील की सलाह लें'] },
    { id: 6, category: 'Property', title: 'Landlord and Tenant Act', description: 'Regulates landlord-tenant relationships', severity: 'small', details: 'यह कानून किराए की संपत्ति का किराया, खली करना आदि नियम बनाता है।', guides: ['किराए का समझौता लिखित में करें', '30 दिन पहले नोटिस दें अगर किराया खाली करना है', 'किराया बढ़ाने का अधिकार सीमित है'] },
    { id: 7, category: 'Family', title: 'Hindu Marriage Act, 1955', description: 'Governs marriage and divorce for Hindus', severity: 'medium', details: 'यह कानून विवाह, तलाक और रिश्ते का नियम बनाता है।', guides: ['विवाह के लिए आवश्यक दस्तावेज़ जानें', 'तलाक के लिए 6 महीने की अवधि है', 'विवाह के 2 साल बाद ही तलाक दे सकते हैं'] },
    { id: 8, category: 'Family', title: 'Dowry Prohibition Act, 1961', description: 'Prohibits dowry in marriages', severity: 'small', details: 'यह कानून दहेज लेना-देना गैरकानूनी घोषित करता है।', guides: ['दहेज की मांग से इनकार करें', 'पुलिस में शिकायत दर्ज करें', 'महिला हेल्पलाइन: 1091 से संपर्क करें'] },
    { id: 9, category: 'Criminal', title: 'Indian Penal Code - Theft (Section 378)', description: 'Defines and punishes theft', severity: 'small', details: 'चोरी करना गैरकानूनी है। दंड: 3 साल तक की जेल या ₹250-500 जुर्माना।', guides: ['चोरी की रिपोर्ट पुलिस को दर्ज कराएं', 'FIR (First Information Report) की कॉपी लें', 'सबूत सुरक्षित रखें'] },
    { id: 10, category: 'Criminal', title: 'IPC Section 498A - Cruelty to Wife', description: 'Punishes cruelty against women', severity: 'medium', details: 'पत्नी के साथ मारपीट या मानसिक प्रताड़ना का दंड 3 साल तक की जेल।', guides: ['तुरंत पुलिस से संपर्क करें', 'महिला थाने में शिकायत दर्ज करें', 'चिकित्सा जांच करवाएं'] },
    { id: 11, category: 'Criminal', title: 'IPC Section 304A - Causing Death by Negligence', description: 'Punishes death caused by negligence', severity: 'medium', details: 'अगर किसी की मौत लापरवाही से हो तो 2 साल की जेल हो सकती है।', guides: ['तुरंत पुलिस को सूचित करें', 'मेडिकल जांच करवाएं', 'वकील की सलाह लें'] },
    { id: 12, category: 'Traffic', title: 'Motor Vehicles Act, 1988', description: 'Regulates road safety and vehicle rules', severity: 'small', details: 'ड्राइविंग लाइसेंस, सीट बेल्ट, हेलमेट आदि के नियम।', guides: ['हेलमेट पहनना अनिवार्य है', 'रेड लाइट पर जुर्माना ₹500 तक', 'ड्राइविंग लाइसेंस हमेशा रखें'] },
    { id: 13, category: 'Environment', title: 'Environment Protection Act, 1986', description: 'Protects environment from pollution', severity: 'medium', details: 'प्रदूषण रोकना सभी का कानूनी कर्तव्य है।', guides: ['औद्योगिक प्रदूषण की शिकायत करें', 'स्थानीय प्रदूषण नियंत्रण बोर्ड से संपर्क करें', 'शहरी विकास कार्यों का विरोध दर्ज करें'] },
    { id: 14, category: 'Tax', title: 'Income Tax Act, 1961', description: 'Governs income tax obligations', severity: 'small', details: 'निर्धारित आय पर आयकर भरना अनिवार्य है।', guides: ['ITR (Income Tax Return) समय पर दाखिल करें', 'Pan Card बनवाएं', 'आयकर में छूट के नियम जानें'] },
    { id: 15, category: 'Cyber', title: 'Information Technology Act, 2000', description: 'Handles cyber crimes and digital rights', severity: 'medium', details: 'साइबर अपराध, ऑनलाइन धोखा, डेटा चोरी आदि से सुरक्षा।', guides: ['साइबर अपराध की शिकायत दर्ज करें', 'National Cyber Crime Portal: cybercrime.gov.in', 'पासवर्ड सुरक्षित रखें'] },
    { id: 16, category: 'Medical', title: 'Medical Negligence Act', description: 'Protects patients from medical malpractice', severity: 'medium', details: 'डॉक्टर की लापरवाही के लिए मुआवजा पा सकते हैं।', guides: ['मेडिकल रिकॉर्ड रखें', 'Medical Council को शिकायत दर्ज करें', 'वकील की मदद लें'] }
  ];

  const categories = ['all', 'Labour', 'Consumer', 'Property', 'Family', 'Criminal', 'Traffic', 'Environment', 'Tax', 'Cyber', 'Medical'];

  const filteredLaws = laws.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         law.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || law.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const severityColors = {
    small: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    large: 'bg-red-100 text-red-700 border-red-200'
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
            { name: "Law Library", path: "/lawlibrary", icon: BookOpen, active: true },
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
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#0A2540]">Law Library</h1>
            <p className="text-gray-600 mt-2 text-lg">भारतीय कानूनों की आसान भाषा में जानकारी</p>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="कानून खोजें (जैसे: Minimum Wages, Consumer...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#FF9933] outline-none text-[15.5px]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl font-medium transition-all text-sm ${
                    selectedCategory === cat 
                      ? 'bg-[#FF9933] text-black shadow' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {cat === 'all' ? 'सभी कानून' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Laws List */}
          <div className="space-y-4">
            {filteredLaws.length > 0 ? (
              filteredLaws.map(law => (
                <div key={law.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden">
                  <div
                    onClick={() => setExpandedLaw(expandedLaw === law.id ? null : law.id)}
                    className="p-6 cursor-pointer hover:bg-gray-50 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-[#0A2540]">{law.title}</h3>
                        <span className={`px-4 py-1 text-xs font-medium rounded-full border ${severityColors[law.severity]}`}>
                          {law.severity === 'small' ? 'सरल' : 'मध्यम'}
                        </span>
                      </div>
                      <p className="text-gray-600">{law.description}</p>
                      <span className="inline-block mt-3 text-xs font-medium bg-[#138808]/10 text-[#138808] px-4 py-1.5 rounded-full">
                        {law.category}
                      </span>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 mt-1 ${expandedLaw === law.id ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expanded Section */}
                  {expandedLaw === law.id && (
                    <div className="border-t border-gray-100 bg-gray-50 p-6 space-y-6">
                      <div>
                        <h4 className="font-semibold text-[#0A2540] mb-2">विस्तृत विवरण</h4>
                        <p className="text-gray-700 leading-relaxed">{law.details}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#0A2540] mb-3">क्या करें?</h4>
                        <ul className="space-y-3">
                          {law.guides.map((guide, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-[#138808] mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{guide}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm">
                        <p className="text-blue-900">
                          <strong>सुझाव:</strong> यह जानकारी सामान्य है। व्यक्तिगत मामलों के लिए वकील से सलाह अवश्य लें।
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center">
                <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl font-medium text-gray-600">कोई कानून नहीं मिला</p>
                <p className="text-gray-500 mt-2">कृपया अपना सर्च या फिल्टर बदलकर प्रयास करें</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawLibrary;