export interface StateInfo {
  name: string
  capital: string
  population: string
  backgroundImage: string
  art: CategoryData
  culture: CategoryData
  tourism: CategoryData
}

export interface CategoryData {
  description: string
  highlights: Highlight[]
  facts: Fact[]
  tags: string[]
}

export interface Highlight {
  name: string
  description: string
  location: string
  rating: number
}

export interface Fact {
  label: string
  value: string
}

export interface StateMetrics {
  gdpRank: string
  literacyRate: string
  area: string
  districts: number
  established: string
  officialLanguage: string
  chiefMinister: string
  economicData: {
    gdpContribution: string
    majorIndustries: string
  }
  developmentTags: string[]
}

// All Indian States and Union Territories for autocomplete
export const allIndianStates = [
  { key: "andhra pradesh", name: "Andhra Pradesh" },
  { key: "arunachal pradesh", name: "Arunachal Pradesh" },
  { key: "assam", name: "Assam" },
  { key: "bihar", name: "Bihar" },
  { key: "chhattisgarh", name: "Chhattisgarh" },
  { key: "goa", name: "Goa" },
  { key: "gujarat", name: "Gujarat" },
  { key: "haryana", name: "Haryana" },
  { key: "himachal pradesh", name: "Himachal Pradesh" },
  { key: "jharkhand", name: "Jharkhand" },
  { key: "karnataka", name: "Karnataka" },
  { key: "kerala", name: "Kerala" },
  { key: "madhya pradesh", name: "Madhya Pradesh" },
  { key: "maharashtra", name: "Maharashtra" },
  { key: "manipur", name: "Manipur" },
  { key: "meghalaya", name: "Meghalaya" },
  { key: "mizoram", name: "Mizoram" },
  { key: "nagaland", name: "Nagaland" },
  { key: "odisha", name: "Odisha" },
  { key: "punjab", name: "Punjab" },
  { key: "rajasthan", name: "Rajasthan" },
  { key: "sikkim", name: "Sikkim" },
  { key: "tamil nadu", name: "Tamil Nadu" },
  { key: "telangana", name: "Telangana" },
  { key: "tripura", name: "Tripura" },
  { key: "uttar pradesh", name: "Uttar Pradesh" },
  { key: "uttarakhand", name: "Uttarakhand" },
  { key: "west bengal", name: "West Bengal" },
  { key: "jammu and kashmir", name: "Jammu & Kashmir" },
  { key: "ladakh", name: "Ladakh" },
  { key: "delhi", name: "Delhi" },
  { key: "chandigarh", name: "Chandigarh" },
  { key: "puducherry", name: "Puducherry" },
  { key: "andaman and nicobar islands", name: "Andaman & Nicobar Islands" },
  { key: "dadra and nagar haveli and daman and diu", name: "Dadra & Nagar Haveli and Daman & Diu" },
  { key: "lakshadweep", name: "Lakshadweep" },
]

// State metrics for the info section (easily editable for Snowflake integration)
export const stateMetrics: Record<string, StateMetrics> = {
  "maharashtra": {
    gdpRank: "1st",
    literacyRate: "82.3%",
    area: "307,713",
    districts: 36,
    established: "1960",
    officialLanguage: "Marathi",
    chiefMinister: "Eknath Shinde",
    economicData: {
      gdpContribution: "14.7% of India's GDP",
      majorIndustries: "Manufacturing, IT, Agriculture",
    },
    developmentTags: ["Industrial Hub", "Financial Capital", "IT Center"],
  },
  "karnataka": {
    gdpRank: "4th",
    literacyRate: "75.4%",
    area: "191,791",
    districts: 31,
    established: "1956",
    officialLanguage: "Kannada",
    chiefMinister: "Siddaramaiah",
    economicData: {
      gdpContribution: "8.2% of India's GDP",
      majorIndustries: "IT, Biotechnology, Aerospace",
    },
    developmentTags: ["Silicon Valley of India", "Garden City", "Tech Hub"],
  },
  "tamil nadu": {
    gdpRank: "2nd",
    literacyRate: "80.1%",
    area: "130,060",
    districts: 38,
    established: "1969",
    officialLanguage: "Tamil",
    chiefMinister: "M.K. Stalin",
    economicData: {
      gdpContribution: "8.5% of India's GDP",
      majorIndustries: "Automobile, Textiles, IT",
    },
    developmentTags: ["Auto Hub", "Temple Land", "Industrial State"],
  },
  "kerala": {
    gdpRank: "8th",
    literacyRate: "94.0%",
    area: "38,852",
    districts: 14,
    established: "1956",
    officialLanguage: "Malayalam",
    chiefMinister: "Pinarayi Vijayan",
    economicData: {
      gdpContribution: "4.2% of India's GDP",
      majorIndustries: "Tourism, Spices, IT",
    },
    developmentTags: ["God's Own Country", "Highest Literacy", "Spice Garden"],
  },
  "gujarat": {
    gdpRank: "5th",
    literacyRate: "78.0%",
    area: "196,244",
    districts: 33,
    established: "1960",
    officialLanguage: "Gujarati",
    chiefMinister: "Bhupendra Patel",
    economicData: {
      gdpContribution: "7.6% of India's GDP",
      majorIndustries: "Chemicals, Petrochemicals, Textiles",
    },
    developmentTags: ["Business Hub", "Industrial State", "Vibrant Gujarat"],
  },
}

export const stateData: Record<string, StateInfo> = {
  "maharashtra": {
    name: "Maharashtra",
    capital: "Mumbai",
    population: "112.4 million",
    backgroundImage: "/placeholder.svg?height=600&width=800",
    art: {
      description:
        "Maharashtra is renowned for its diverse art forms including Warli painting, Paithani weaving, and classical dance forms.",
      highlights: [
        {
          name: "Warli Art",
          description: "Traditional tribal art form using geometric patterns",
          location: "Thane District",
          rating: 4.8,
        },
        {
          name: "Paithani Sarees",
          description: "Exquisite handwoven silk sarees with gold threads",
          location: "Aurangabad",
          rating: 4.9,
        },
        {
          name: "Lavani Dance",
          description: "Traditional folk dance form of Maharashtra",
          location: "Throughout Maharashtra",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Art Forms", value: "50+" },
        { label: "Museums", value: "200+" },
        { label: "Galleries", value: "150+" },
        { label: "Artists", value: "10,000+" },
      ],
      tags: ["Warli", "Paithani", "Lavani", "Classical", "Folk Art"],
    },
    culture: {
      description:
        "Rich cultural heritage with festivals like Ganesh Chaturthi, diverse cuisine, and architectural marvels.",
      highlights: [
        {
          name: "Ganesh Chaturthi",
          description: "Grand festival celebrating Lord Ganesha",
          location: "Mumbai",
          rating: 4.9,
        },
        {
          name: "Ajanta Caves",
          description: "Ancient Buddhist cave paintings and sculptures",
          location: "Aurangabad",
          rating: 4.8,
        },
        {
          name: "Marathi Literature",
          description: "Rich tradition of poetry and prose",
          location: "Pune",
          rating: 4.6,
        },
      ],
      facts: [
        { label: "Languages", value: "22" },
        { label: "Festivals", value: "100+" },
        { label: "Heritage Sites", value: "5" },
        { label: "Traditions", value: "500+" },
      ],
      tags: ["Festivals", "Literature", "Architecture", "Cuisine", "Traditions"],
    },
    tourism: {
      description: "From bustling Mumbai to serene hill stations, Maharashtra offers diverse tourism experiences.",
      highlights: [
        {
          name: "Gateway of India",
          description: "Iconic monument overlooking the Arabian Sea",
          location: "Mumbai",
          rating: 4.7,
        },
        {
          name: "Lonavala",
          description: "Popular hill station with scenic beauty",
          location: "Pune District",
          rating: 4.5,
        },
        {
          name: "Shirdi",
          description: "Sacred pilgrimage site of Sai Baba",
          location: "Ahmednagar",
          rating: 4.8,
        },
      ],
      facts: [
        { label: "Tourist Spots", value: "300+" },
        { label: "Annual Visitors", value: "120M" },
        { label: "Hotels", value: "5,000+" },
        { label: "Hill Stations", value: "15" },
      ],
      tags: ["Beaches", "Hills", "Pilgrimage", "Adventure", "Heritage"],
    },
  },
  "karnataka": {
    name: "Karnataka",
    capital: "Bengaluru",
    population: "61.1 million",
    backgroundImage: "/placeholder.svg?height=600&width=800",
    art: {
      description:
        "Karnataka is famous for its classical music, dance forms like Bharatanatyam, and traditional crafts.",
      highlights: [
        {
          name: "Mysore Painting",
          description: "Traditional style of painting originated in Mysore",
          location: "Mysore",
          rating: 4.8,
        },
        {
          name: "Channapatna Toys",
          description: "Colorful wooden toys and dolls",
          location: "Channapatna",
          rating: 4.6,
        },
        {
          name: "Yakshagana",
          description: "Traditional theater form combining dance and music",
          location: "Coastal Karnataka",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Art Forms", value: "40+" },
        { label: "Museums", value: "80+" },
        { label: "Galleries", value: "60+" },
        { label: "Artists", value: "5,000+" },
      ],
      tags: ["Mysore Painting", "Yakshagana", "Handicrafts", "Classical Music"],
    },
    culture: {
      description: "Rich cultural tapestry with ancient temples, classical music traditions, and diverse festivals.",
      highlights: [
        {
          name: "Hampi",
          description: "UNESCO World Heritage Site with Vijayanagara ruins",
          location: "Bellary",
          rating: 4.9,
        },
        {
          name: "Dasara Festival",
          description: "Grand celebration in the royal city of Mysore",
          location: "Mysore",
          rating: 4.8,
        },
        {
          name: "Carnatic Music",
          description: "Classical South Indian music tradition",
          location: "Throughout Karnataka",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Languages", value: "15" },
        { label: "Festivals", value: "80+" },
        { label: "Heritage Sites", value: "3" },
        { label: "Temples", value: "34,000+" },
      ],
      tags: ["Temples", "Music", "Dance", "Architecture", "Festivals"],
    },
    tourism: {
      description:
        "From IT capital Bengaluru to historical sites and beautiful landscapes, Karnataka offers varied experiences.",
      highlights: [
        {
          name: "Coorg",
          description: "Scotland of India with coffee plantations",
          location: "Kodagu",
          rating: 4.8,
        },
        {
          name: "Gokarna",
          description: "Pristine beaches and pilgrimage site",
          location: "Uttara Kannada",
          rating: 4.6,
        },
        {
          name: "Bandipur National Park",
          description: "Tiger reserve and wildlife sanctuary",
          location: "Chamarajanagar",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Tourist Spots", value: "200+" },
        { label: "Annual Visitors", value: "80M" },
        { label: "Hotels", value: "3,000+" },
        { label: "National Parks", value: "5" },
      ],
      tags: ["Wildlife", "Beaches", "Hills", "Heritage", "Adventure"],
    },
  },
  "tamil nadu": {
    name: "Tamil Nadu",
    capital: "Chennai",
    population: "72.1 million",
    backgroundImage: "/placeholder.svg?height=600&width=800",
    art: {
      description:
        "Tamil Nadu is the cradle of classical arts including Bharatanatyam, Carnatic music, and bronze sculptures.",
      highlights: [
        {
          name: "Bharatanatyam",
          description: "Classical dance form originated in Tamil Nadu",
          location: "Throughout Tamil Nadu",
          rating: 4.9,
        },
        {
          name: "Tanjore Painting",
          description: "Traditional painting style with gold foil work",
          location: "Thanjavur",
          rating: 4.8,
        },
        {
          name: "Bronze Sculptures",
          description: "Exquisite Chola bronze sculptures",
          location: "Swamimalai",
          rating: 4.9,
        },
      ],
      facts: [
        { label: "Art Forms", value: "60+" },
        { label: "Museums", value: "100+" },
        { label: "Galleries", value: "80+" },
        { label: "Artists", value: "8,000+" },
      ],
      tags: ["Bharatanatyam", "Carnatic Music", "Bronze Art", "Tanjore Painting"],
    },
    culture: {
      description: "Ancient Tamil culture with magnificent temples, classical literature, and vibrant festivals.",
      highlights: [
        {
          name: "Meenakshi Temple",
          description: "Magnificent Dravidian architecture temple",
          location: "Madurai",
          rating: 4.9,
        },
        {
          name: "Pongal Festival",
          description: "Harvest festival celebrating prosperity",
          location: "Throughout Tamil Nadu",
          rating: 4.8,
        },
        {
          name: "Tamil Literature",
          description: "Ancient literary tradition dating back 2000 years",
          location: "Throughout Tamil Nadu",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Languages", value: "10" },
        { label: "Festivals", value: "90+" },
        { label: "Heritage Sites", value: "4" },
        { label: "Temples", value: "40,000+" },
      ],
      tags: ["Temples", "Literature", "Festivals", "Architecture", "Traditions"],
    },
    tourism: {
      description:
        "Rich heritage sites, beautiful beaches, hill stations, and spiritual destinations make Tamil Nadu a complete tourist destination.",
      highlights: [
        {
          name: "Ooty",
          description: "Queen of Hill Stations with tea gardens",
          location: "Nilgiris",
          rating: 4.7,
        },
        {
          name: "Mahabalipuram",
          description: "UNESCO World Heritage Site with rock-cut temples",
          location: "Kanchipuram",
          rating: 4.8,
        },
        {
          name: "Rameswaram",
          description: "Sacred pilgrimage island destination",
          location: "Ramanathapuram",
          rating: 4.8,
        },
      ],
      facts: [
        { label: "Tourist Spots", value: "250+" },
        { label: "Annual Visitors", value: "100M" },
        { label: "Hotels", value: "4,000+" },
        { label: "Beaches", value: "20+" },
      ],
      tags: ["Temples", "Beaches", "Hills", "Heritage", "Pilgrimage"],
    },
  },
  "kerala": {
    name: "Kerala",
    capital: "Thiruvananthapuram",
    population: "33.4 million",
    backgroundImage: "/placeholder.svg?height=600&width=800",
    art: {
      description:
        "Kerala's art forms include Kathakali, Mohiniyattam, and traditional crafts like coir and spice art.",
      highlights: [
        {
          name: "Kathakali",
          description: "Classical dance-drama with elaborate costumes",
          location: "Throughout Kerala",
          rating: 4.9,
        },
        {
          name: "Mohiniyattam",
          description: "Classical dance form performed by women",
          location: "Throughout Kerala",
          rating: 4.8,
        },
        {
          name: "Theyyam",
          description: "Ritualistic art form and dance",
          location: "North Kerala",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Art Forms", value: "30+" },
        { label: "Museums", value: "50+" },
        { label: "Galleries", value: "40+" },
        { label: "Artists", value: "3,000+" },
      ],
      tags: ["Kathakali", "Mohiniyattam", "Theyyam", "Folk Art", "Handicrafts"],
    },
    culture: {
      description: "God's Own Country with unique cultural practices, festivals, and harmonious religious diversity.",
      highlights: [
        {
          name: "Onam Festival",
          description: "State festival celebrating King Mahabali",
          location: "Throughout Kerala",
          rating: 4.9,
        },
        {
          name: "Backwater Culture",
          description: "Unique lifestyle around backwater regions",
          location: "Alleppey, Kumarakom",
          rating: 4.8,
        },
        {
          name: "Ayurveda",
          description: "Traditional system of medicine and wellness",
          location: "Throughout Kerala",
          rating: 4.8,
        },
      ],
      facts: [
        { label: "Languages", value: "8" },
        { label: "Festivals", value: "50+" },
        { label: "Heritage Sites", value: "2" },
        { label: "Traditions", value: "200+" },
      ],
      tags: ["Festivals", "Ayurveda", "Backwaters", "Spices", "Traditions"],
    },
    tourism: {
      description: "Tropical paradise with backwaters, beaches, hill stations, and wildlife sanctuaries.",
      highlights: [
        {
          name: "Alleppey Backwaters",
          description: "Venice of the East with houseboat cruises",
          location: "Alappuzha",
          rating: 4.9,
        },
        {
          name: "Munnar",
          description: "Hill station with tea plantations",
          location: "Idukki",
          rating: 4.8,
        },
        {
          name: "Kovalam Beach",
          description: "Crescent-shaped beach with lighthouse",
          location: "Thiruvananthapuram",
          rating: 4.6,
        },
      ],
      facts: [
        { label: "Tourist Spots", value: "150+" },
        { label: "Annual Visitors", value: "60M" },
        { label: "Hotels", value: "2,500+" },
        { label: "Beaches", value: "15+" },
      ],
      tags: ["Backwaters", "Beaches", "Hills", "Wildlife", "Ayurveda"],
    },
  },
  "gujarat": {
    name: "Gujarat",
    capital: "Gandhinagar",
    population: "60.4 million",
    backgroundImage: "/placeholder.svg?height=600&width=800",
    art: {
      description:
        "Gujarat is famous for its vibrant textiles, handicrafts, and folk art forms like Garba and Dandiya.",
      highlights: [
        {
          name: "Bandhani Textiles",
          description: "Traditional tie-dye textile art",
          location: "Kutch, Rajkot",
          rating: 4.8,
        },
        {
          name: "Patola Sarees",
          description: "Double ikat woven silk sarees",
          location: "Patan",
          rating: 4.9,
        },
        {
          name: "Rogan Art",
          description: "Traditional cloth painting using castor oil paint",
          location: "Kutch",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Art Forms", value: "45+" },
        { label: "Museums", value: "70+" },
        { label: "Galleries", value: "50+" },
        { label: "Artists", value: "6,000+" },
      ],
      tags: ["Textiles", "Handicrafts", "Folk Art", "Embroidery", "Pottery"],
    },
    culture: {
      description: "Rich cultural heritage with colorful festivals, traditional architecture, and Gujarati cuisine.",
      highlights: [
        {
          name: "Navratri Festival",
          description: "Nine-night festival with Garba and Dandiya",
          location: "Throughout Gujarat",
          rating: 4.9,
        },
        {
          name: "Sabarmati Ashram",
          description: "Mahatma Gandhi's residence and museum",
          location: "Ahmedabad",
          rating: 4.8,
        },
        {
          name: "Gujarati Cuisine",
          description: "Vegetarian cuisine with diverse flavors",
          location: "Throughout Gujarat",
          rating: 4.7,
        },
      ],
      facts: [
        { label: "Languages", value: "12" },
        { label: "Festivals", value: "70+" },
        { label: "Heritage Sites", value: "3" },
        { label: "Traditions", value: "300+" },
      ],
      tags: ["Festivals", "Gandhi", "Cuisine", "Architecture", "Traditions"],
    },
    tourism: {
      description: "From the white desert of Kutch to the Asiatic lions of Gir, Gujarat offers unique experiences.",
      highlights: [
        {
          name: "Rann of Kutch",
          description: "White salt desert with cultural festival",
          location: "Kutch",
          rating: 4.9,
        },
        {
          name: "Gir National Park",
          description: "Only home to Asiatic lions in the world",
          location: "Junagadh",
          rating: 4.8,
        },
        {
          name: "Somnath Temple",
          description: "One of the twelve Jyotirlinga temples",
          location: "Gir Somnath",
          rating: 4.8,
        },
      ],
      facts: [
        { label: "Tourist Spots", value: "180+" },
        { label: "Annual Visitors", value: "70M" },
        { label: "Hotels", value: "2,800+" },
        { label: "Wildlife Sanctuaries", value: "4" },
      ],
      tags: ["Wildlife", "Desert", "Temples", "Heritage", "Festivals"],
    },
  },
}
