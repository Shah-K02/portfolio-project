import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Calendar, Clock, Tag, Search, Filter, ExternalLink, Heart, MessageCircle, Share2 } from 'react-feather';
import './Blog.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  likes: number;
  comments: number;
  imageUrl?: string;
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useScrollAnimation({ amount: 0.2 });

  const blogPosts = useMemo<BlogPost[]>(() => [
    {
      id: 'post1',
      title: 'Building Scalable React Applications with TypeScript',
      excerpt: 'Learn how to structure large-scale React applications using TypeScript, best practices for component architecture, and performance optimization techniques.',
      content: 'Full blog post content would go here...',
      author: 'John Doe',
      publishDate: '2024-01-15',
      readTime: 8,
      category: 'React',
      tags: ['React', 'TypeScript', 'Architecture', 'Performance'],
      featured: true,
      likes: 124,
      comments: 18,
      imageUrl: 'https://via.placeholder.com/600x300/667eea/ffffff?text=React+TypeScript'
    },
    {
      id: 'post2',
      title: 'Modern CSS Techniques: Grid, Flexbox, and Beyond',
      excerpt: 'Explore advanced CSS techniques including CSS Grid, Flexbox, custom properties, and modern layout patterns for responsive web design.',
      content: 'Full blog post content would go here...',
      author: 'John Doe',
      publishDate: '2024-01-10',
      readTime: 6,
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Flexbox', 'Responsive'],
      featured: false,
      likes: 89,
      comments: 12,
      imageUrl: 'https://via.placeholder.com/600x300/764ba2/ffffff?text=Modern+CSS'
    },
    {
      id: 'post3',
      title: 'Node.js Performance Optimization Strategies',
      excerpt: 'Discover techniques to optimize Node.js applications, including memory management, async patterns, and monitoring best practices.',
      content: 'Full blog post content would go here...',
      author: 'John Doe',
      publishDate: '2024-01-05',
      readTime: 10,
      category: 'Node.js',
      tags: ['Node.js', 'Performance', 'Backend', 'Optimization'],
      featured: true,
      likes: 156,
      comments: 24,
      imageUrl: 'https://via.placeholder.com/600x300/f67280/ffffff?text=Node.js+Performance'
    },
    {
      id: 'post4',
      title: 'Introduction to GraphQL with Apollo Client',
      excerpt: 'Get started with GraphQL and Apollo Client, learn about queries, mutations, and how to integrate with React applications.',
      content: 'Full blog post content would go here...',
      author: 'John Doe',
      publishDate: '2023-12-28',
      readTime: 7,
      category: 'GraphQL',
      tags: ['GraphQL', 'Apollo', 'API', 'React'],
      featured: false,
      likes: 73,
      comments: 9,
      imageUrl: 'https://via.placeholder.com/600x300/a8e6cf/ffffff?text=GraphQL+Apollo'
    },
    {
      id: 'post5',
      title: 'Docker for Frontend Developers',
      excerpt: 'Learn how to use Docker for frontend development, including containerizing React apps, development workflows, and deployment strategies.',
      content: 'Full blog post content would go here...',
      author: 'John Doe',
      publishDate: '2023-12-20',
      readTime: 9,
      category: 'DevOps',
      tags: ['Docker', 'DevOps', 'Deployment', 'Frontend'],
      featured: false,
      likes: 102,
      comments: 15,
      imageUrl: 'https://via.placeholder.com/600x300/ff8a80/ffffff?text=Docker+Frontend'
    },
    {
      id: 'post6',
      title: 'State Management in React: Redux vs Zustand vs Context',
      excerpt: 'Compare different state management solutions for React applications and learn when to use each approach.',
      content: 'Full blog post content would go here...',
      author: 'John Doe',
      publishDate: '2023-12-15',
      readTime: 12,
      category: 'React',
      tags: ['React', 'State Management', 'Redux', 'Zustand'],
      featured: true,
      likes: 198,
      comments: 31,
      imageUrl: 'https://via.placeholder.com/600x300/81c784/ffffff?text=State+Management'
    }
  ], []);

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, blogPosts]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section 
      ref={ref}
      className={`blog-section section-animated fade-up ${
        inView ? 'section-visible' : 'section-hidden'
      }`}
    >
      <div className="blog-container">
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="blog-title">
            Latest Blog Posts
            <span className="title-underline"></span>
          </h2>
          <p className="blog-subtitle">
            Insights, tutorials, and thoughts on modern web development
          </p>
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          className="featured-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="section-heading">Featured Posts</h3>
          <div className="featured-grid">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <motion.article
                  key={post.id}
                  className="featured-card"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="featured-image">
                  <img src={post.imageUrl} alt={post.title} />
                  <div className="featured-overlay">
                    <span className="featured-badge">Featured</span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">
                      <Calendar size={14} />
                      {formatDate(post.publishDate)}
                    </span>
                    <span className="read-time">
                      <Clock size={14} />
                      {post.readTime} min read
                    </span>
                  </div>
                  <h4 className="featured-title">{post.title}</h4>
                  <p className="featured-excerpt">{post.excerpt}</p>
                  <div className="post-tags">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="post-actions">
                    <div className="post-stats">
                      <span className="stat">
                        <Heart size={14} />
                        {post.likes}
                      </span>
                      <span className="stat">
                        <MessageCircle size={14} />
                        {post.comments}
                      </span>
                    </div>
                    <button 
                      className="read-more-btn"
                      onClick={() => handleReadMore(post)}
                    >
                      Read More
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="blog-controls"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <Filter size={16} className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* All Posts Grid */}
        <motion.div
          className="posts-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="section-heading">
            All Posts ({filteredPosts.length})
          </h3>
          <div className="posts-grid">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="post-card"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  layout
                >
                  <div className="post-image">
                    <img src={post.imageUrl} alt={post.title} />
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-category">{post.category}</span>
                      <span className="post-date">
                        <Calendar size={12} />
                        {formatDate(post.publishDate)}
                      </span>
                    </div>
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="post-stats">
                        <span className="stat">
                          <Heart size={12} />
                          {post.likes}
                        </span>
                        <span className="stat">
                          <MessageCircle size={12} />
                          {post.comments}
                        </span>
                        <span className="read-time">
                          <Clock size={12} />
                          {post.readTime} min
                        </span>
                      </div>
                      <button 
                        className="read-more-btn small"
                        onClick={() => handleReadMore(post)}
                      >
                        Read
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <motion.div
            className="blog-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="blog-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
              <div className="modal-header">
                <img src={selectedPost.imageUrl} alt={selectedPost.title} />
                <div className="modal-meta">
                  <span className="modal-category">{selectedPost.category}</span>
                  <h3 className="modal-title">{selectedPost.title}</h3>
                  <div className="modal-info">
                    <span>
                      <Calendar size={14} />
                      {formatDate(selectedPost.publishDate)}
                    </span>
                    <span>
                      <Clock size={14} />
                      {selectedPost.readTime} min read
                    </span>
                    <span>By {selectedPost.author}</span>
                  </div>
                </div>
              </div>
              <div className="modal-content">
                <p>{selectedPost.content}</p>
                <div className="modal-tags">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="tag">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="modal-actions">
                  <div className="modal-stats">
                    <button className="stat-btn">
                      <Heart size={16} />
                      {selectedPost.likes}
                    </button>
                    <button className="stat-btn">
                      <MessageCircle size={16} />
                      {selectedPost.comments}
                    </button>
                    <button className="stat-btn">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;