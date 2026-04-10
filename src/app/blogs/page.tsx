'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, 'blogs');
        const blogsQuery = query(blogsRef, orderBy('publishedAt', 'desc'));
        const blogsSnapshot = await getDocs(blogsQuery);
        
        const blogPosts = blogsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        
        if (blogPosts.length > 0) {
          setFeaturedBlog(blogPosts[0]);
          setBlogs(blogPosts.slice(1));
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  // Filter blogs by category
  const filteredBlogs = activeCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category.toLowerCase() === activeCategory.toLowerCase());
  
  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Femtro Blog
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights, updates, and stories from the Femtro team
          </p>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Featured Post */}
        {featuredBlog && (
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.01] hover:shadow-2xl">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredBlog.coverImage || 'https://via.placeholder.com/800x600'} 
                    alt={featuredBlog.title}
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-3 py-1 rounded-full">
                        {featuredBlog.category}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(featuredBlog.publishedAt).toLocaleDateString()} • {featuredBlog.readTime} min read
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center">
                      <img 
                        src={featuredBlog.authorImage || '/images/user.svg'} 
                        alt={featuredBlog.author}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {featuredBlog.author}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href={`/blogs/${featuredBlog.id}`} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                      Read Full Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={blog.coverImage || 'https://via.placeholder.com/400x300'} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-0 right-0 p-2">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2 py-1 rounded">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <img 
                          src={blog.authorImage || '/images/user.svg'} 
                          alt={blog.author}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {blog.author}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(blog.publishedAt).toLocaleDateString()} • {blog.readTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No blog posts found
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {activeCategory !== 'all' 
                  ? `No posts in the "${activeCategory}" category yet.` 
                  : 'Check back soon for new content!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}