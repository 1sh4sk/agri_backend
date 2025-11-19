import {
  Additional,
  Book,
  Crops,
  Farm,
  Farmer,
  Fingerprint,
  Profile,
  Suitcase,
} from "../assets";

export const FarmerSteps = [
  {
    id: "basic",
    label: "Basic Details",
    icon: Profile,
    subTabs: [{ id: "basic", label: "Basic Details" }],
  },
  {
    id: "kyc",
    icon: Fingerprint,
    label: "KYC & Verification",
    subTabs: [
      { id: "aadhaar", label: "Aadhaar" },
      { id: "pan", label: "PAN" },
      { id: "others", label: "Others" },
    ],
  },
  {
    id: "farmer",
    icon: Farmer,
    label: "Farmer Details",
    subTabs: [{ id: "farmer", label: "Farmer Details" }],
  },
  {
    id: "farm",
    icon: Farm,
    label: "Farm Details",
    subTabs: [{ id: "landandcropdetails", label: "Land & Crop Details" }],
  },
  {
    id: "crop",
    icon: Crops,
    label: "Crops & Availability",
    subTabs: [
      { id: "croplist", label: "Crop List" },
      { id: "availability", label: "Availability" },
    ],
  },
  {
    id: "additional",
    label: "Additional Info",
    icon: Additional,
    subTabs: [
      { id: "certificates", label: "Certificates" },
      { id: "awards", label: "Awards" },
      { id: "sellingpreferences", label: "Selling Preferences" },
      { id: "mediaupload", label: "Media Upload" },
    ],
  },
];

export const IndividualSteps = [
  {
    id: "basic",
    label: "Basic Details",
    icon: Profile,
    subTabs: [{ id: "basic", label: "Basic Details" }],
  },
  {
    id: "kyc",
    icon: Fingerprint,
    label: "KYC & Verification",
    subTabs: [
      { id: "aadhaar", label: "Aadhaar" },
      { id: "pan", label: "PAN" },
      { id: "others", label: "Others" },
    ],
  },
  {
    id: "professional-details",
    icon: Suitcase,
    label: "Professional Details",
    subTabs: [
      { id: "info", label: "Professional Info" },
      { id: "skills", label: "Skills & Expertise" },
      { id: "service", label: "Service Offered" },
      { id: "portfolio", label: "Portfolio" },
    ],
  },
  {
    id: "experience-details",
    icon: Farm,
    label: "Experience Details",
    subTabs: [
      { id: "experience", label: "Work Experience" },
      { id: "projects", label: "Projects" },
      { id: "achievements", label: "Achievements" },
      { id: "publications", label: "Publications" },
    ],
  },
  {
    id: "education",
    icon: Book,
    label: "Education & Certificates",
    subTabs: [
      { id: "degree", label: "degree" },
      { id: "additional-courses", label: "Additional Courses" },
      { id: "certificates", label: "Certificates" },
    ],
  },
  {
    id: "additional",
    label: "Additional Info",
    icon: Additional,
    subTabs: [
      { id: "awards", label: "Awards & Recognition" },
      { id: "social", label: "Social Links" },
      { id: "consultation", label: "Consultation Details" },
      { id: "membership", label: "Membership & Associations" },
      { id: "media", label: "Media Upload" },
    ],
  },
];
