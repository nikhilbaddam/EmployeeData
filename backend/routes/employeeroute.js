const express = require('express');
const router = express.Router();
const { addEmployee, loginEmployee, getAllEmployees, updateEmployee } = require('../controllers/employcontroller');
const multer = require('multer');

// Setup multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');  // Ensure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Routes
router.post('/register', upload.single("image"), addEmployee);  // Register employee with image
router.post('/login', loginEmployee);  // Employee login
router.get('/getEmployees', getAllEmployees);  // Get all employees
router.put('/update/:id', upload.single("image"), updateEmployee);  // Update employee details (with optional image)

module.exports = router;
