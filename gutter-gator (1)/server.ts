import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import multer from "multer";
import fs from "fs";

import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database("database.sqlite");

// Initialize Database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      customerEmail TEXT,
      customerName TEXT,
      customerPhone TEXT,
      serviceType TEXT,
      description TEXT,
      status TEXT,
      address TEXT,
      lat REAL,
      lng REAL,
      mediaUrls TEXT,
      createdAt DATETIME
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      customerEmail TEXT,
      amount REAL,
      description TEXT,
      fileUrl TEXT,
      status TEXT,
      createdAt DATETIME
    )
  `);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static("uploads"));

  // API Routes
  app.post("/api/quotes", upload.array("media"), (req, res) => {
    const { 
      email, name, phone, serviceType, description, address, lat, lng 
    } = req.body;
    
    const mediaUrls = (req.files as Express.Multer.File[]).map(
      (file) => `/uploads/${file.filename}`
    );

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    const query = `
      INSERT INTO quotes (id, customerEmail, customerName, customerPhone, serviceType, description, status, address, lat, lng, mediaUrls, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [id, email, name, phone, serviceType, description, "pending", address, lat, lng, JSON.stringify(mediaUrls), createdAt],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, message: "Quote request submitted successfully" });
      }
    );
  });

  app.get("/api/quotes/:email", (req, res) => {
    const { email } = req.params;
    db.all("SELECT * FROM quotes WHERE customerEmail = ?", [email], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get("/api/invoices/:email", (req, res) => {
    const { email } = req.params;
    db.all("SELECT * FROM invoices WHERE customerEmail = ? ORDER BY createdAt DESC", [email], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Admin: Upload Invoice
  app.post("/api/admin/invoices", upload.single('invoice'), (req, res) => {
    const { email, amount, description } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const id = uuidv4();
    const createdAt = new Date().toISOString();

    db.run(
      "INSERT INTO invoices (id, customerEmail, amount, description, fileUrl, status, createdAt) VALUES (?, ?, ?, ?, ?, 'unpaid', ?)",
      [id, email, amount, description, fileUrl, createdAt],
      function(err) {
        if (err) {
          console.error("DB Error:", err);
          return res.status(500).json({ error: err.message });
        }
        res.json({ id, success: true });
      }
    );
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
