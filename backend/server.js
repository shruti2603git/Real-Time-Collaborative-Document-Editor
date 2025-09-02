// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/Document");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express(); // <-- you missed this line earlier
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"],
  },
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/google-docs-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// REST endpoint (optional) - create a blank doc
app.post("/documents", async (req, res) => {
  const newDoc = new Document({ _id: req.body.id, data: {} });
  await newDoc.save();
  res.status(201).send(newDoc);
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: {} });
}

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
