const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');

// ====================== MULTER SETUP (Strong Fix) ======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Folder automatically create kar do agar nahi hai
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("✅ Uploads folder created");
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, DOC, DOCX, JPG, JPEG, PNG files allowed!'));
  }
});

// ====================== UPLOAD ROUTE ======================
router.post('/upload', upload.single('document'), async (req, res) => {
  try {
    console.log("📤 File Upload Request Received");
    console.log("File Info:", req.file);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const newDocument = new Document({
      user: "temp-user-id",
      filename: req.file.originalname,
      filePath: req.file.path,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      size: req.file.size
    });

    await newDocument.save();

    console.log("✅ Document Saved Successfully:", newDocument.filename);

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully!",
      document: newDocument
    });

  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================== GET DOCUMENTS ======================
router.get('/my-documents', async (req, res) => {
  try {
    const documents = await Document.find({ user: "temp-user-id" })
      .sort({ uploadedAt: -1 });
    
    res.json({ success: true, documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching documents" });
  }
});

// ====================== DOWNLOAD ROUTE (Best Fix) ======================
router.get('/download/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    const filePath = document.filePath;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found on server" });
    }

    res.setHeader('Content-Type', document.fileType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${document.filename}"`);

    res.sendFile(filePath);

  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ success: false, message: "Error downloading file" });
  }
});

module.exports = router;