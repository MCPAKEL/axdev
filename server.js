const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
}).single('image');

app.use(express.static('public'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    const { title, description } = req.body;
    const filename = req.file.filename;

    // Save image information to a JSON file (you can use a database in a real application)
    const dataPath = path.join(__dirname, 'public', 'data.json');
    let imageData = [];
    
    try {
      // Read existing data
      const existingData = fs.readFileSync(dataPath, 'utf-8');
      imageData = JSON.parse(existingData);
    } catch (error) {
      console.error('Error reading data file:', error);
    }

    // Add new image data
    imageData.push({
      title,
      description,
      filename,
    });

    // Save updated data
    fs.writeFileSync(dataPath, JSON.stringify(imageData, null, 2), 'utf-8');

    res.json({ filename, title, description });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
