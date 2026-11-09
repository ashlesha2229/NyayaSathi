const express = require('express');
const path = require('path');     // ← Yeh line add karo
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documentRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// Static files serve karne ke liye (uploads folder)
// Static files serve karne ke liye (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connect
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('✅ NyayaSathi Backend is Running 🚀');
});

// ==================== AI ANALYSIS ROUTE ====================
app.post('/api/analyze', async (req, res) => {
  const { problem } = req.body;

  if (!problem || problem.trim() === "") {
    return res.status(400).json({ error: "Problem describe karo" });
  }

  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are NyayaSathi - Indian Legal Awareness AI.

User Problem: "${problem}"

Respond in the same language as the user.
Give answer in strict JSON format only:

{
  "violation": "short title",
  "category": "Tenant Rights / Domestic etc",
  "urgency": "High/Medium/Low",
  "laws": "relevant laws",
  "message": "practical advice",
  "steps": ["step1", "step2", "step3", "step4"],
  "complaintDraft": "full complaint letter"
}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    text = text.replace(/```json|```/g, '').trim();

    const analysis = JSON.parse(text);
    res.json(analysis);

  } catch (error) {
    console.error("Gemini Error:", error.message);
    
    // Fallback Response (MongoDB ke saath bhi chalega)
    res.json({
      violation: "Illegal Eviction Without Notice",
      category: "Tenant Rights",
      urgency: "High",
      laws: "Rent Control Act, IPC Section 441, 503",
      message: "Landlord ne bina notice ke ghar se nikaalna illegal hai. Aapka case strong hai.",
      steps: [
        "Saare proofs (chat, agreement, witnesses) collect karo",
        "Police station mein written complaint do",
        "Police na maane to Magistrate Court mein jaao",
        "Lawyer se milo"
      ],
      complaintDraft: "Mujhe bina kisi notice ke ghar se bahar nikaal diya gaya hai jo ki galat hai."
    });
  }
});

// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 NyayaSathi Backend running on http://localhost:${PORT}`);
});