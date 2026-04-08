import { desc, em, image } from "framer-motion/m";
import { features } from "process";

export const Add = [
  {link: "/New-folder/(2).mp4", name: "Houses", description: "Comfortable athletic shoes" },
] 

// app/data/product.ts   (or wherever your data file is)

export   const products = [
  {
    id: 1,
    name: "Toyota Camry 2022",
    category: "Vehicles",
    deposite: 500.00,
    conditon: "new",           // fixed spelling: "condition"
    location: "Addis Ababa",
    price: 899.99,
    rating: 3,
    reviews: 342,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download2.jpg", "/download3.jpg", "/download4.jpg"]
  },
  {
    id: 2,
    name: "Modern 2 Bedroom Apartment",
    category: "Real Estate",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 450.00,
    rating: 4.8,
    reviews: 189,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download2.jpg"]
  },
  {
    id: 3,
    name: "iPhone 14 Pro Max",
    category: "Electronics",
    deposite: 500.00,
    conditon: "used",
    location: "Addis Ababa",
    price: 599.99,
    rating: 4.2,
    reviews: 756,
    status: "available",
   details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download3.jpg"]
  },
  {
    id: 4,
    name: "Honda CBR 150R Motorcycle",
    category: "Vehicles",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 299.99,
    rating: 4.6,
    reviews: 124,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download4.jpg"]
  },
  {
    id: 5,
    name: "Sony Alpha A7 III Camera",
    category: "Electronics",
    deposite: 500.00,
    conditon: "used",
    location: "Addis Ababa",
    price: 1249.99,
    rating: 4.9,
    reviews: 203,
    status: "available",
  details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download.jpg"]
  },
  {
    id: 6,
    name: "Luxury Villa with Garden",
    category: "Real Estate",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 1200.00,
    rating: 4.7,
    reviews: 87,
    status: "available",
details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download (1).jpg"]
  },
  {
    id: 7,
    name: "MacBook Pro 16-inch M2",
    category: "Electronics",
    deposite: 500.00,
    conditon: "used",
    location: "Addis Ababa",
    price: 1499.99,
    rating: 4.4,
    reviews: 312,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download (2).jpg"]
  },
  {
    id: 8,
    name: "Nike Air Force 1 Sneakers",
    category: "Clothing",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 89.99,
    rating: 4.3,
    reviews: 521,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download (3).jpg"]
  },
  {
    id: 9,
    name: "3 Bedroom Family House",
    category: "Real Estate",
    deposite: 500.00,
    conditon: "used",
    location: "Addis Ababa",
    price: 650.00,
    rating: 4.1,
    reviews: 156,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download (4).jpg"]
  },
  {
    id: 10,
    name: "Suzuki Alto 2023",
    category: "Vehicles",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 399.99,
    rating: 4.5,
    reviews: 98,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download (5).jpg"]
  },
  {
    id: 11,
    name: "Dell XPS 15 Laptop",
    category: "Electronics",
    deposite: 500.00,
    conditon: "used",
    location: "Addis Ababa",
    price: 899.99,
    rating: 4.6,
    reviews: 234,
    status: "available",
   details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/download (6).jpg"]
  },
  {
    id: 12,
    name: "Studio Apartment Downtown",
    category: "Real Estate",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 280.00,
    rating: 4.0,
    reviews: 67,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/images (3).jpg"]
  },
  {
    id: 13,
    name: "Yamaha R15 Motorcycle",
    category: "Vehicles",
    deposite: 500.00,
    conditon: "used",
    location: "Addis Ababa",
    price: 249.99,
    rating: 4.7,
    reviews: 145,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/images (2).jpg"]
  },
  {
    id: 14,
    name: "Men's Leather Jacket",
    category: "Clothing",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 129.99,
    rating: 4.2,
    reviews: 89,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/images (1).jpg"]
  },
  {
    id: 15,
    name: "Canon EOS R6 Camera",
    category: "Electronics",
    deposite: 500.00,
    conditon: "new",
    location: "Addis Ababa",
    price: 1799.99,
    rating: 4.9,
    reviews: 176,
    status: "available",
    details: {
      description: "Well-maintained Toyota Camry in excellent condition. Perfect for daily commute.",
      features: "Eco-mode enabled, lane assist, and premium sound system.",
      package: "Includes full tank of gas, spare tire, and phone mount.",
      warranty: "Comprehensive insurance included for the rental period."
    },
    specifications: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "Camry" },
      { label: "Year", value: "2022" },
      { label: "Fuel Type", value: "Hybrid" },
      { label: "Transmission", value: "Automatic" }
    ],
    image: ["/images.jpg"]
  },
]; 

 export const  reviews = [
  {  id: 1, name: "John Doe",
  rating: 4, image: "/download (7).jpg",
  comment: "Great product, highly recommend!",},
 {id: 2, name: "Jane Smith",
  rating: 5, image: "/download (8).jpg",
  comment: "Excellent quality and fast delivery.",},
  {id: 3, name: "Alice Johnson",
  rating: 4, image: "/download (9).jpg",
  comment: "Good value for money.",}
]
export const user=[
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"

  },
  {    id: 2, name: "Jane Smith",
    email: "jane.smith@example.com"},
    {    id: 3, name: "Alice Johnson",email: "alice.johnson@example.com"}
]