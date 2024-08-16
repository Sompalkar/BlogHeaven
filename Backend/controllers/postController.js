const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
};

exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            author: req.user.id,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updatePost = async (req, res) => {
    const { title, content } = req.body;

    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post.title = title;
        post.content = content;

        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
};

// exports.deletePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         if (!post) {
//             return res.status(404).json({ msg: 'Post not found' });
//         }

//         if (post.author.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorized' });
//         }

//         await post.remove();
//         res.json({ msg: 'Post removed' });
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ msg: 'Post not found' });
//         }
//         res.status(500).send('Server error');
//     }
// };



exports.deletePost = async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);

      if (!post) {
          return res.status(404).json({ msg: 'Post not found' });
      }

      // Check if the user is the author of the post
      if (post.author.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
      }

      // Use deleteOne() or findByIdAndDelete() to remove the post
      await Post.deleteOne({ _id: req.params.id });

      // Alternatively, you can use:
      // await Post.findByIdAndDelete(req.params.id);

      res.json({ msg: 'Post removed' });
  } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server error');
  }
};


exports.getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('author', 'username');
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server error');
    }
  };


  exports.getUserPosts = async (req, res) => {
    try {
      const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };






  exports.addComment = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      const newComment = {
        content: req.body.content,
        author: req.user.id,
      };
  
      post.comments.push(newComment);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  