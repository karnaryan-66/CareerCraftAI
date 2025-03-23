import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Video, FileText, Lightbulb, Search, ExternalLink, BookMarked, Trophy, Briefcase, Code } from "lucide-react";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  // Resources data
  const courses = [
    {
      title: "The Complete Web Development Bootcamp",
      provider: "Udemy",
      level: "Beginner to Intermediate",
      duration: "63 hours",
      description: "A comprehensive course covering HTML, CSS, JavaScript, Node.js, React, MongoDB and more.",
      link: "#",
      tags: ["Web Development", "Full Stack", "JavaScript"],
      icon: <Code className="h-8 w-8 text-primary-600" />
    },
    {
      title: "Machine Learning Engineering Career Path",
      provider: "Coursera",
      level: "Intermediate to Advanced",
      duration: "6 months",
      description: "Master machine learning concepts, algorithms, and practical applications for real-world problems.",
      link: "#",
      tags: ["Machine Learning", "AI", "Python"],
      icon: <Briefcase className="h-8 w-8 text-primary-600" />
    },
    {
      title: "UX Design Professional Certificate",
      provider: "Google",
      level: "Beginner",
      duration: "6 months",
      description: "Learn the foundations of UX design and create a professional portfolio.",
      link: "#",
      tags: ["UX/UI", "Design", "Portfolio"],
      icon: <Lightbulb className="h-8 w-8 text-primary-600" />
    },
    {
      title: "Product Management Certification",
      provider: "Product School",
      level: "Intermediate",
      duration: "8 weeks",
      description: "Learn product management fundamentals from industry experts at top tech companies.",
      link: "#",
      tags: ["Product Management", "Strategy", "Leadership"],
      icon: <Trophy className="h-8 w-8 text-primary-600" />
    }
  ];

  const articles = [
    {
      title: "How to Transition into a Tech Career",
      author: "Sarah Johnson",
      publication: "Medium",
      date: "March 15, 2025",
      description: "A detailed guide on how to successfully transition into a tech career from a non-technical background.",
      link: "#",
      tags: ["Career Change", "Tech Industry", "Skills Development"],
      readTime: "12 min read"
    },
    {
      title: "The Future of AI in the Workplace",
      author: "Dr. Michael Chen",
      publication: "Harvard Business Review",
      date: "February 28, 2025",
      description: "An in-depth analysis of how artificial intelligence will transform workplace roles and skills requirements in the next decade.",
      link: "#",
      tags: ["AI", "Future of Work", "Technology Trends"],
      readTime: "15 min read"
    },
    {
      title: "Essential Soft Skills for Technical Professionals",
      author: "Emma Williams",
      publication: "Forbes",
      date: "January 10, 2025",
      description: "Why soft skills are just as important as technical abilities for career advancement in technology fields.",
      link: "#",
      tags: ["Soft Skills", "Career Growth", "Leadership"],
      readTime: "8 min read"
    },
    {
      title: "Building a Personal Brand as a Developer",
      author: "Alex Rodriguez",
      publication: "Dev.to",
      date: "March 5, 2025",
      description: "Practical strategies for developers to build a strong personal brand and stand out in a competitive job market.",
      link: "#",
      tags: ["Personal Branding", "Career Development", "Networking"],
      readTime: "10 min read"
    }
  ];

  const videos = [
    {
      title: "Day in the Life of a Senior Software Engineer",
      creator: "TechLife",
      platform: "YouTube",
      duration: "18:42",
      description: "Follow a senior software engineer through their workday at a major tech company.",
      link: "#",
      tags: ["Software Engineering", "Career Insights", "Tech Industry"],
      views: "1.2M views"
    },
    {
      title: "How I Landed My First Data Science Job",
      creator: "Data Science Dojo",
      platform: "YouTube",
      duration: "24:15",
      description: "A data scientist shares their journey, challenges, and tips for breaking into the field.",
      link: "#",
      tags: ["Data Science", "Career Transition", "Job Search"],
      views: "895K views"
    },
    {
      title: "UX Design Portfolio Review Session",
      creator: "DesignMasters",
      platform: "YouTube",
      duration: "45:30",
      description: "Expert designers review portfolios and provide actionable feedback for improvement.",
      link: "#",
      tags: ["UX Design", "Portfolio", "Feedback"],
      views: "567K views"
    },
    {
      title: "The Art of Salary Negotiation in Tech",
      creator: "Career Coach Emily",
      platform: "YouTube",
      duration: "32:18",
      description: "Learn effective strategies for negotiating your salary and benefits in the technology sector.",
      link: "#",
      tags: ["Salary Negotiation", "Career Advice", "Professional Development"],
      views: "723K views"
    }
  ];

  const books = [
    {
      title: "Cracking the Coding Interview",
      author: "Gayle Laakmann McDowell",
      publisher: "CareerCup",
      year: "2019",
      description: "A comprehensive guide to technical interview preparation with 189 programming questions and solutions.",
      link: "#",
      tags: ["Interview Prep", "Algorithms", "Problem Solving"],
      pages: "706 pages"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      publisher: "Penguin Random House",
      year: "2018",
      description: "Learn how small changes in daily habits can lead to remarkable results in personal and professional growth.",
      link: "#",
      tags: ["Productivity", "Habit Formation", "Self-Improvement"],
      pages: "320 pages"
    },
    {
      title: "Designing Your Work Life",
      author: "Bill Burnett & Dave Evans",
      publisher: "Knopf",
      year: "2020",
      description: "Apply design thinking principles to create a more fulfilling and purposeful career.",
      link: "#",
      tags: ["Career Design", "Work-Life Balance", "Design Thinking"],
      pages: "304 pages"
    },
    {
      title: "The Manager's Path",
      author: "Camille Fournier",
      publisher: "O'Reilly Media",
      year: "2017",
      description: "A guide for tech professionals transitioning from individual contributor to management roles.",
      link: "#",
      tags: ["Leadership", "Management", "Career Progression"],
      pages: "244 pages"
    }
  ];

  // Filter resources based on search query
  const filterResources = (resources: any[]) => {
    if (!searchQuery) return resources;
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredCourses = filterResources(courses);
  const filteredArticles = filterResources(articles);
  const filteredVideos = filterResources(videos);
  const filteredBooks = filterResources(books);

  return (
    <div className="container max-w-6xl py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Career Resources
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore curated resources to help you advance your career and develop new skills
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative max-w-2xl mx-auto mb-12"
      >
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search resources by title, description, or tag..."
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Resources Tabs */}
      <Tabs defaultValue="courses">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="books" className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            Books
          </TabsTrigger>
        </TabsList>

        {/* Courses Content */}
        <TabsContent value="courses">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            By {course.provider} • {course.duration}
                          </CardDescription>
                        </div>
                        <div className="p-2 bg-primary-50 rounded-lg">
                          {course.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{course.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {course.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">Level: {course.level}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                          View Course <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">No courses found matching your search criteria.</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        {/* Articles Content */}
        <TabsContent value="articles">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center justify-between mt-1">
                        <span>By {article.author} • {article.publication}</span>
                        <span className="text-sm">{article.readTime}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{article.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">Published: {article.date}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                          Read Article <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        {/* Videos Content */}
        <TabsContent value="videos">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">{video.title}</CardTitle>
                      <CardDescription className="flex items-center justify-between mt-1">
                        <span>By {video.creator} • {video.platform}</span>
                        <span className="text-sm">{video.duration}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{video.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {video.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{video.views}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <a href={video.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                          Watch Video <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">No videos found matching your search criteria.</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        {/* Books Content */}
        <TabsContent value="books">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">{book.title}</CardTitle>
                      <CardDescription className="flex items-center justify-between mt-1">
                        <span>By {book.author} • {book.year}</span>
                        <span className="text-sm">{book.pages}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{book.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {book.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">Publisher: {book.publisher}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <a href={book.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                          Find Book <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">No books found matching your search criteria.</p>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center bg-gradient-to-r from-primary-100 to-primary-50 p-10 rounded-2xl mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Looking for personalized resource recommendations?</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Get AI-powered learning resources tailored specifically to your career goals and skill level.
        </p>
        <Button size="lg" className="text-lg px-8 py-6 h-auto">
          Get Personalized Recommendations
        </Button>
      </motion.div>
    </div>
  );
}