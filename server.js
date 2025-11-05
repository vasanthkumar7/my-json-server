const express = require("express");
const fs = require("fs");
const cors = require("cors");  // ✅ import cors
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());               // ✅ enable all origins
app.use(express.json());

// Read data
app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Cannot read data" });
    res.json(JSON.parse(data || "{}"));
  });
});

// Write data
app.post("/data", (req, res) => {
  fs.writeFile("data.json", JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Cannot save data" });
    res.json({ message: "Data saved!" });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));