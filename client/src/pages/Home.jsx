  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { TypeAnimation } from 'react-type-animation';
  import { motion } from "framer-motion";
  import { useInView } from "react-intersection-observer";
  import { BookOpen, Code, Terminal, MessageSquare, Bookmark } from 'lucide-react';
  import PostCard from "../components/PostCard";

  export default function Home() {
    const [posts, setPosts] = useState([]);
    const { ref: featuresRef, inView: featuresInView } = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/post/getposts");
          const data = await res.json();
          setPosts(data.posts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
    }, []);

    const features = [
      {
        icon: <BookOpen className="w-8 h-8 text-purple-500" />,
        title: "In-Depth Tutorials",
        description: "Comprehensive guides on modern web development technologies."
      },
      {
        icon: <Code className="w-8 h-8 text-blue-500" />,
        title: "Code Examples",
        description: "Real-world code snippets and practical implementations."
      },
      {
        icon: <Terminal className="w-8 h-8 text-green-500" />,
        title: "Best Practices",
        description: "Industry-standard coding practices and architecture patterns."
      },
      {
        icon: <MessageSquare className="w-8 h-8 text-yellow-500" />,
        title: "Community Driven",
        description: "Engage with other developers and share your knowledge."
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col gap-5 pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20 dark:from-purple-900/20 dark:to-blue-900/20" />
          </div>
          
        

  <motion.h1 
    className="text-4xl sm:text-5xl py-4 lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <TypeAnimation
      sequence={[
        "Welcome to Nitin's Blog", // text to show
        2000, // wait 2s
        "Explore JavaScript & React", // second text
        2000,
        "Real Dev Experience Posts",
        2000,
        "Welcome to Nitin's Blog", // loop back
        2000
      ]}
      speed={50}
      wrapper="span"
      repeat={Infinity}
    />
  </motion.h1>


          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover articles and tutorials on <span className="font-semibold text-purple-600 dark:text-purple-400">web development</span>,{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">software engineering</span>, and various{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">programming languages</span> written from real developer experience.
          </motion.p>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/search"
              className="inline-block mt-4 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Explore Articles →
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          ref={featuresRef}
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 px-4 py-12 sm:py-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Master JavaScript Development
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Explore our curated collection of JavaScript projects and level up your development skills.
                </p>
                <a 
                  href="https://portfolio-frontend-zeta-self.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  View JavaScript Projects →
                </a>
              </div>
              <div className="flex-1">
                <img 
                  src="https://www.squash.io/wp-content/uploads/2023/11/javascript-series.jpg" 
                  alt="JavaScript Projects" 
                  className="rounded-xl shadow-lg w-full object-cover"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Posts Section (Added Exactly Like Your Original Code) */}
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
              <div className="flex flex-wrap gap-16 justify-center items-center py-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to={"/search"}
                className="text-lg text-teal-500 hover:underline text-center"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>


      </div>
    );
  }
