"use client";

import Container from "@/components/Container";
import Section from "@/components/Section";
import { Analytics } from "@vercel/analytics/react";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";
import { useState } from "react";

const ConnectsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("discover");

  // Sample categories for skills
  const skillCategories = [
    { name: "Technology", icon: "💻" },
    { name: "Design", icon: "🎨" },
    { name: "Business", icon: "📊" },
    { name: "Marketing", icon: "📱" },
  ];

  // Sample featured mentors
  const featuredMentors = [
    {
      name: "Priya Sharma",
      role: "Senior Software Engineer at Google",
      skills: ["Web Development", "AI", "Cloud Computing"],
      avatar: "/images/user.svg",
    },
    {
      name: "Rahul Patel",
      role: "UX Designer at Microsoft",
      skills: ["UI/UX", "Product Design", "Figma"],
      avatar: "/images/user.svg",
    },
    {
      name: "Ananya Singh",
      role: "Marketing Manager at Amazon",
      skills: ["Digital Marketing", "Content Strategy", "SEO"],
      avatar: "/images/user.svg",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFF8E1] to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Femtro <span className="text-[#F5C33B]">Connects</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Connect with students and professionals, showcase your skills,
                and find mentorship opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link
                    href="/connects/profile"
                    className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg inline-block text-center"
                  >
                    My Profile
                  </Link>
                ) : (
                  <button className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
                    Sign In to Get Started
                  </button>
                )}
                <Link
                  href="#how-it-works"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-[#F5C33B] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 inline-block text-center"
                >
                  How It Works
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5C33B]/30 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="text-6xl">👥🔗🚀</div>
                <p className="absolute bottom-4 right-4 bg-[#F5C33B] text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg z-20">
                  Connect & Grow!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Main Navigation Tabs */}
          {user && (
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                  onClick={() => setActiveTab("discover")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === "discover"
                      ? "bg-[#F5C33B] text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => setActiveTab("mentors")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === "mentors"
                      ? "bg-[#F5C33B] text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Find Mentors
                </button>
                <Link
                  href="/connects/profile"
                  className={`px-6 py-3 rounded-full font-semibold transition-all bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`}
                >
                  My Profile
                </Link>
              </div>

              {/* Tab Content */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                {activeTab === "discover" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      Discover by Skills
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      {skillCategories.map((category, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 text-center cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className="text-4xl mb-3">{category.icon}</div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {category.name}
                          </h3>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Suggested Connections
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Complete your profile to see personalized connection
                        suggestions.
                      </p>
                      <Link
                        href="/connects/profile"
                        className="text-[#F5C33B] hover:text-[#E6B42C] font-medium"
                      >
                        Complete Your Profile →
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === "mentors" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      Featured Mentors
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {featuredMentors.map((mentor, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center mb-4">
                            <img
                              src={mentor.avatar}
                              alt={mentor.name}
                              className="w-16 h-16 rounded-full mr-4"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {mentor.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {mentor.role}
                              </p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Skills:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {mentor.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="bg-[#FFF8E1] dark:bg-gray-600 text-[#F5C33B] px-2 py-1 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="w-full bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-medium py-2 px-4 rounded-full transition duration-300 text-sm">
                            Request Mentorship
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "chats" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      My Chats
                    </h2>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 text-center">
                      <div className="text-5xl mb-4">💬</div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Chat Portal
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Connect with other users or join a community chat to
                        start messaging in our Discord-style chat interface.
                      </p>
                      <Link href="/connects/chat" className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-medium py-2 px-6 rounded-full transition duration-300 inline-block">
                        Open Chat Portal
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* How It Works */}
          <Section
            id="how-it-works"
            title="How Femtro Connects Works"
            description="Build your network, showcase your skills, and find mentorship"
          >
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
                <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#F5C33B]">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Create Your Profile
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Sign up and create your profile showcasing your skills,
                  interests, and expertise. Add your portfolio and availability
                  for collaboration.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
                <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#F5C33B]">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Connect & Discover
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Browse profiles based on skills and interests. Connect with
                  like-minded individuals and request mentorship from
                  professionals.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
                <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#F5C33B]">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Chat & Collaborate
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Use our built-in chat system for one-on-one conversations or
                  join topic-based community chats to discuss and collaborate on
                  projects.
                </p>
              </div>
            </div>
          </Section>

          {/* Features */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Key <span className="text-[#F5C33B]">Features</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#FFF8E1] dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Profile & Skill Showcase
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Create a comprehensive profile highlighting your skills,
                    interests, and expertise. Showcase your projects and
                    portfolio to stand out.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#FFF8E1] dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Skill Discovery
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Find and connect with others based on skills, interests, or
                    specializations. Our advanced filtering helps you discover
                    the right connections.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#FFF8E1] dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Professional Mentorship
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Connect with experienced professionals for guidance and
                    mentorship. Learn from industry experts and accelerate your
                    career growth.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#FFF8E1] dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Community Chat System
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Engage in one-on-one chats or join topic-based community
                    discussions. Share media, collaborate on projects, and build
                    meaningful connections.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Analytics />
        </div>
      </Container>
    </>
  );
};

export default ConnectsPage;
