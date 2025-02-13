const express = require('express');
const multer = require('multer');
const blogController = require('../controller/blog');
const isAuthenticated = require('../Modules/isAuth');
const blogrouter = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage: storage });


blogrouter.get('/add',isAuthenticated, blogController.renderAddBlog);
blogrouter.get('/edit/:id', blogController.renderEditBlog);

blogrouter.get('/all',isAuthenticated, blogController.renderAllBlogs);
blogrouter.get('/myblog', blogController.renderMyBlogs); 

// Blog action routes for post
blogrouter.post('/add',isAuthenticated, upload.single('image'), blogController.addBlog);
blogrouter.post('/edit/:id', isAuthenticated, upload.single('image'), blogController.editBlog);


blogrouter.post('/delete/:id', isAuthenticated, blogController.deleteBlog);

module.exports = blogrouter;
