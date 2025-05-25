import CallToAction from "../components/CallToAction";
import FeatureCard from "../components/FeatureCard";

export default function About() {
  const highlights = [
    {
      title: "Modern Stack",
      description:
        "Built with MongoDB, Express, React, and Node.js for a robust and scalable architecture.",
    },
    {
      title: "Dynamic Admin Panel",
      description:
        "Easily manage blog posts, users, and categories with a secure and intuitive dashboard.",
    },
    {
      title: "Advanced Search & Filter",
      description:
        "Users can quickly find content using real-time search and filtering across categories.",
    },
    {
      title: "Interactive Community",
      description:
        "Readers can comment, reply, and like — creating a vibrant, engaging developer space.",
    },
  ];

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-gray-50 dark:bg-gray-900">
      {/* Upper Section: Blog Introduction */}
      <div className="max-w-2xl mx-auto p-3 text-center">
        <h1 className="text-3xl font-semibold text-center my-7 text-gray-800 dark:text-white">
          About Nitin&apos;s Blog
        </h1>
        <div className="text-md text-gray-500 dark:text-gray-400 flex flex-col gap-6">
          <p>
            Nitin&apos;s Blog is a blog that I created to share my thoughts and ideas with the world.
            I am a Full Stack Engineer and I love to write about my experiences and things that I have learned.
            I hope you enjoy reading my blog.
          </p>
          <p>
            On this blog, you'll find weekly articles and tutorials on topics such as web development, software engineering, and programming languages. Nitin is always learning and exploring new technologies, so be sure to check back often for new content!
          </p>
          <p>
            We encourage you to leave comments on our posts and engage with other readers. You can like other people's comments and reply to them as well. We believe that a community of learners can help each other grow and improve.
          </p>
        </div>

        <div className="my-12">
          <CallToAction />
        </div>
      </div>

      {/* Lower Section: MERN Blog Features */}
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Why Nitin&apos;s Blog Stands Out
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {highlights.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}