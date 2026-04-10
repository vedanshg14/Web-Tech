"use client";

import Container from "@/components/Container";
import Section from "@/components/Section";
import { Analytics } from "@vercel/analytics/react";

const CareersPage: React.FC = () => {
  // Career benefits
  const benefits = [
    {
      title: "Flexible Schedule",
      icon: "⏰",
      description:
        "Work around your academic commitments with our flexible hours.",
    },
    {
      title: "Skill Development",
      icon: "📈",
      description:
        "Gain real-world experience and build your professional portfolio.",
    },
    {
      title: "Networking",
      icon: "🤝",
      description:
        "Connect with industry professionals and expand your network.",
    },
    {
      title: "Growth Opportunities",
      icon: "🚀",
      description:
        "Potential for full-time roles after graduation for top performers.",
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
                Join Our <span className="text-[#F5C33B]">Dynamic Team</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Be part of the revolution in campus transportation and delivery
                services. We're looking for passionate individuals to help us
                grow.
              </p>
              <a
                href="#opportunities"
                className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg inline-block"
              >
                View Opportunities
              </a>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5C33B]/30 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍💼👩‍💼</div>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Build Your Future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Why Join Us */}
          <Section
            id="why-join-us"
            title="Why Join Femtro?"
            description="Discover the benefits of working with us"
          >
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <div className="w-16 h-16 bg-[#FFF8E1] dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">{benefit.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-center">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Current Opportunities */}
          <Section
            id="opportunities"
            title="Current Opportunities"
            description="Find your perfect role"
          >
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              {/* Marketing Intern Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-[#F5C33B]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Marketing Intern
                    </h3>
                    <span className="bg-[#FFF8E1] dark:bg-gray-700 text-[#F5C33B] px-3 py-1 rounded-full text-sm font-medium">
                      Part-time
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Join our marketing team to help grow the Femtro brand on
                    campus and beyond. You'll work on creative campaigns and
                    digital marketing initiatives.
                  </p>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      What You'll Do:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Develop and implement marketing strategies
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Create engaging content for social media platforms
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Analyze marketing data and campaign performance
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Collaborate with the team on promotional events
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      What We're Looking For:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Strong communication and creative skills
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Basic understanding of digital marketing
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Ability to work in a fast-paced environment
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Currently enrolled in a degree program
                        </span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="https://forms.gle/oozt1aYtM4zTTRKd8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-2 px-6 rounded-full inline-block transition duration-300"
                  >
                    Apply Now
                  </a>
                </div>
              </div>

              {/* Operations Intern Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-[#F5C33B]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Operations Intern
                    </h3>
                    <span className="bg-[#FFF8E1] dark:bg-gray-700 text-[#F5C33B] px-3 py-1 rounded-full text-sm font-medium">
                      Part-time
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Help us streamline our operations and improve service
                    delivery. You'll work on optimizing processes and enhancing
                    customer experience.
                  </p>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      What You'll Do:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Assist in coordinating delivery operations
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Help optimize service processes and workflows
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Support customer service initiatives
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Contribute to operational reporting and analysis
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      What We're Looking For:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Excellent organizational and time management skills
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Problem-solving mindset
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Basic understanding of operations management
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F5C33B] mr-2">✦</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Currently enrolled in a degree program
                        </span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="https://forms.gle/oozt1aYtM4zTTRKd8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-2 px-6 rounded-full inline-block transition duration-300"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </Section>
        </div>
        <Analytics />
      </Container>
    </>
  );
};

export default CareersPage;
