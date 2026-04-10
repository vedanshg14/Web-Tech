"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Container from "@/components/Container";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

interface UserProfile {
  displayName: string;
  university?: string;
  specializations: string[];
  skills: string[];
  bio?: string;
  portfolioLinks?: string[];
  availableForMentoring: boolean;
  availableForCollaboration: boolean;
  profilePictureUrl?: string;
}

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    displayName: "",
    university: "",
    specializations: [],
    skills: [],
    bio: "",
    portfolioLinks: [""],
    availableForMentoring: false,
    availableForCollaboration: false,
    profilePictureUrl: "",
  });

  // Skill categories for selection
  const skillCategories = [
    { name: "Web Development", category: "Technology" },
    { name: "Mobile Development", category: "Technology" },
    { name: "Data Science", category: "Technology" },
    { name: "UI/UX Design", category: "Design" },
    { name: "Graphic Design", category: "Design" },
    { name: "Digital Marketing", category: "Marketing" },
    { name: "Content Writing", category: "Marketing" },
    { name: "Business Analysis", category: "Business" },
    { name: "Project Management", category: "Business" },
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/connects");
    }
  }, [user, loading, router]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      try {
        const userProfileDoc = await getDoc(doc(db, "userProfiles", user.uid));

        if (userProfileDoc.exists()) {
          const userData = userProfileDoc.data() as UserProfile;
          setProfile(userData);
        } else {
          // Initialize with user data from auth if available
          setProfile((prev) => ({
            ...prev,
            displayName: user.displayName || "",
            profilePictureUrl: user.photoURL || "",
          }));
          setIsEditing(true); // Auto-enable editing for new profiles
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setProfile((prev) => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter((s) => s !== skill),
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill],
        };
      }
    });
  };

  const handleSpecializationToggle = (specialization: string) => {
    setProfile((prev) => {
      if (prev.specializations.includes(specialization)) {
        return {
          ...prev,
          specializations: prev.specializations.filter(
            (s) => s !== specialization
          ),
        };
      } else {
        return {
          ...prev,
          specializations: [...prev.specializations, specialization],
        };
      }
    });
  };

  const handlePortfolioLinkChange = (index: number, value: string) => {
    setProfile((prev) => {
      const updatedLinks = [...(prev.portfolioLinks || [""])];
      updatedLinks[index] = value;
      return {
        ...prev,
        portfolioLinks: updatedLinks,
      };
    });
  };

  const addPortfolioLink = () => {
    setProfile((prev) => ({
      ...prev,
      portfolioLinks: [...(prev.portfolioLinks || []), ""],
    }));
  };

  const removePortfolioLink = (index: number) => {
    setProfile((prev) => {
      const updatedLinks = [...(prev.portfolioLinks || [])];
      updatedLinks.splice(index, 1);
      return {
        ...prev,
        portfolioLinks: updatedLinks,
      };
    });
  };

  const saveProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const profileData = { ...profile };

      // Upload profile image if changed
      if (profileImage) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        const downloadURL = await getDownloadURL(storageRef);
        profileData.profilePictureUrl = downloadURL;
      }

      // Remove empty portfolio links
      if (profileData.portfolioLinks) {
        profileData.portfolioLinks = profileData.portfolioLinks.filter(
          (link) => link.trim() !== ""
        );
      }

      // Save to Firestore
      await setDoc(doc(db, "userProfiles", user.uid), profileData);

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <Container>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 mt-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditing ? "Edit Profile" : "My Profile"}
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-medium py-2 px-6 rounded-full transition duration-300"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-full transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfile}
                  className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-medium py-2 px-6 rounded-full transition duration-300 flex items-center gap-2"
                  disabled={isSaving}
                >
                  {isSaving && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  )}
                  Save Profile
                </button>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Profile Header with Image */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="relative">
                  {isEditing ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#F5C33B]">
                      <img
                        src={
                          imagePreview ||
                          profile.profilePictureUrl ||
                          user.photoURL ||
                          "/images/user.svg"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                        <span className="text-white text-sm font-medium">
                          Change
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#F5C33B]">
                      <img
                        src={
                          profile.profilePictureUrl ||
                          user.photoURL ||
                          "/images/user.svg"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={profile.displayName}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              displayName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#F5C33B] focus:border-[#F5C33B] dark:bg-gray-700 dark:text-white"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          University/College
                        </label>
                        <input
                          type="text"
                          value={profile.university || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              university: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#F5C33B] focus:border-[#F5C33B] dark:bg-gray-700 dark:text-white"
                          placeholder="Your university or college"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {profile.displayName}
                      </h2>
                      {profile.university && (
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {profile.university}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {profile.availableForMentoring && (
                          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium">
                            Available for Mentoring
                          </span>
                        )}
                        {profile.availableForCollaboration && (
                          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                            Open to Collaboration
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#F5C33B] focus:border-[#F5C33B] dark:bg-gray-700 dark:text-white h-32"
                  placeholder="Tell others about yourself, your interests, and what you're looking to achieve..."
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  {profile.bio || "No bio provided yet."}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skills
              </h3>
              {isEditing ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {skillCategories.map((skill, index) => (
                      <div
                        key={index}
                        onClick={() => handleSkillToggle(skill.name)}
                        className={`px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                          profile.skills.includes(skill.name)
                            ? "bg-[#F5C33B] text-gray-900"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profile.skills.includes(skill.name)}
                            onChange={() => {}} // Handled by parent div click
                            className="mr-2 h-4 w-4 accent-[#F5C33B]"
                          />
                          <span>{skill.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.length > 0 ? (
                    profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#FFF8E1] dark:bg-gray-700 text-[#F5C33B] px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No skills added yet.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Specializations Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Specializations
              </h3>
              {isEditing ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {[
                      "Web Development",
                      "Mobile Apps",
                      "Data Science",
                      "UI/UX Design",
                      "Marketing",
                      "Content Creation",
                    ].map((specialization, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleSpecializationToggle(specialization)
                        }
                        className={`px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                          profile.specializations.includes(specialization)
                            ? "bg-[#F5C33B] text-gray-900"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profile.specializations.includes(
                              specialization
                            )}
                            onChange={() => {}} // Handled by parent div click
                            className="mr-2 h-4 w-4 accent-[#F5C33B]"
                          />
                          <span>{specialization}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.length > 0 ? (
                    profile.specializations.map((specialization, index) => (
                      <span
                        key={index}
                        className="bg-[#FFF8E1] dark:bg-gray-700 text-[#F5C33B] px-3 py-1 rounded-full text-sm"
                      >
                        {specialization}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No specializations added yet.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Portfolio Links Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Portfolio & Projects
              </h3>
              {isEditing ? (
                <div className="space-y-3">
                  {(profile.portfolioLinks || [""]).map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={link}
                        onChange={(e) =>
                          handlePortfolioLinkChange(index, e.target.value)
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#F5C33B] focus:border-[#F5C33B] dark:bg-gray-700 dark:text-white"
                        placeholder="https://your-project-link.com"
                      />
                      <button
                        onClick={() => removePortfolioLink(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        disabled={(profile.portfolioLinks || []).length <= 1}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addPortfolioLink}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <span>+ Add Link</span>
                  </button>
                </div>
              ) : (
                <div>
                  {(profile.portfolioLinks || []).length > 0 &&
                  profile.portfolioLinks![0] !== "" ? (
                    <ul className="space-y-2">
                      {profile.portfolioLinks!.map((link, index) => (
                        <li key={index}>
                          <a
                            href={
                              link.startsWith("http") ? link : `https://${link}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#F5C33B] hover:text-[#E6B42C] hover:underline"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No portfolio links added yet.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Availability Section */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Availability
              </h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="mentoring"
                      checked={profile.availableForMentoring}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          availableForMentoring: e.target.checked,
                        })
                      }
                      className="h-5 w-5 accent-[#F5C33B]"
                    />
                    <label
                      htmlFor="mentoring"
                      className="ml-2 text-gray-700 dark:text-gray-300"
                    >
                      Available for Mentoring
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="collaboration"
                      checked={profile.availableForCollaboration}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          availableForCollaboration: e.target.checked,
                        })
                      }
                      className="h-5 w-5 accent-[#F5C33B]"
                    />
                    <label
                      htmlFor="collaboration"
                      className="ml-2 text-gray-700 dark:text-gray-300"
                    >
                      Open to Collaboration
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  {!profile.availableForMentoring &&
                  !profile.availableForCollaboration ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      Not currently available for mentoring or collaboration.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {profile.availableForMentoring && (
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <span className="text-green-500 mr-2">✓</span>{" "}
                          Available for Mentoring
                        </li>
                      )}
                      {profile.availableForCollaboration && (
                        <li className="flex items-center text-gray-700 dark:text-gray-300">
                          <span className="text-green-500 mr-2">✓</span> Open to
                          Collaboration
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/connects"
              className="text-[#F5C33B] hover:text-[#E6B42C] font-medium"
            >
              ← Back to Femtro Connects
            </Link>
          </div>

          <Analytics />
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
