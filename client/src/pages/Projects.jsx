import { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";

const projectData = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio built using React.js and Tailwind CSS.",
    link: "https://portfolio-frontend-zeta-self.vercel.app/"
  },
  {
    title: "Portfolio Dashboard",
    description: "Dashboard for managing portfolio data.",
    link: "https://portfolio-dashboard-beige.vercel.app"
  },
  {
    title: "Food Delivery Web App",
    description: "A complete frontend for a food delivery platform.",
    link: "https://food-delivery-frontend-kohl.vercel.app/"
  },
  {
    title: "Weather App",
    description: "Check real-time weather for any city. Built with HTML, CSS & JS.",
    link: "https://nitinkumar09.github.io/weather-apps/"
  },
  {
    title: "Todo List App",
    description: "Simple and fast Todo list with modern UI.",
    link: "https://todo-ten-opal-59.vercel.app/"
  },
  {
    title: "IT Services Website",
    description: "Landing site for IT service company.",
    link: "https://mantrabytes.onrender.com/"
  }
];

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleProjects(projectData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">My Projects</h1>
        <p className="text-gray-600 text-lg">Explore what I’ve built using modern web technologies.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-in-out">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-in-out p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-purple-500 hover:to-green-400 transition duration-300 text-center shadow-md"
              >
                🚀 Visit Project
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16">
        <CallToAction />
      </div>
    </div>
  );
}
