const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: '*'
}));
app.use(express.json()); // To parse JSON bodies

// Import routes
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');
const threadRoutes = require('./routes/threads');
const postRoutes = require('./routes/posts');
const imageRoutes = require('./routes/images');
const messageRoutes = require('./routes/messages');
const favoriteRoutes = require('./routes/favorites');
const tagRoutes = require('./routes/tags');
const threadTagRoutes = require('./routes/threadTags');
const reactionRoutes = require('./routes/reactions');
const friendRoutes = require('./routes/friends');

// Use routes with base paths
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/threads', threadRoutes);
app.use('/posts', postRoutes);
app.use('/images', imageRoutes);
app.use('/messages', messageRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/tags', tagRoutes);
app.use('/threadtags', threadTagRoutes);
app.use('/reactions', reactionRoutes);
app.use('/friends', friendRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
