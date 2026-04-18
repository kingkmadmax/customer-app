// app/data/notifications.ts

export interface NotificationItem {
  id: number;
  type: string;
  image: string;       // Path to the circular image (e.g., "/notif-food.jpg")
  title: string;       // e.g., "SALE IS LIVE"
  description: string; // Lorem ipsum content
  timeAgo: string;     // e.g., "1m ago." or "10 Hrs ago."
  badgeCount?: number; // Optional orange badge number
}

export const notifications: NotificationItem[] = [
  {
    id: 1,
    type: "food",
    image: "/download.jpg", // Replace with your actual image path
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit.",
    timeAgo: "1m ago.",
    badgeCount: 2,
  },
  {
    id: 2,
    type: "abstract-dark",
    image: "/download (1).jpg",
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    timeAgo: "1m ago.",
    badgeCount: 2,
  },
  {
    id: 3,
    type: "waves",
    image: "/download (2).jpg",
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    timeAgo: "1m ago.",
  },
  {
    id: 4,
    type: "food-dark",
    image: "/download (3).jpg",
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    timeAgo: "10 Hrs ago.",
  },
  {
    id: 5,
    type: "abstract-blue",
    image: "/download (4).jpg",
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    timeAgo: "15 Hrs ago.",
  },
];