export type Review = {
  name: string;
  rating: 5 | 4 | 3 | 2 | 1;
  text: string;
  source?: "Google" | "Facebook" | "Yelp";
};

export const reviews: Review[] = [
  {
    name: "Autumn Lunsford",
    rating: 5,
    text: "My parents gifted a cleaning to me (btw best gift ever). Lacee did an amazing job! I made sure to put everything away and declutter before so she can deep clean everything! But she said she will do dishes, put away and organize too if you’d like! It was really nice to have a little reset after being so sick and completely fatigued and not having any energy to do anything. I will from now on ask for house cleaning for a gift 🤣 especially having 2 dogs!",
    source: "Google",
  },
  {
    name: "Jeremy",
    rating: 5,
    text: "I had them come and clean my apartment and it was absolutely spotless. They did an amazing job moping all the floors and cleaning the shower. Worked with my schedule which is pretty hectic. Great pricing and I'll be scheduling again soon. Thank you Lacee!",
    source: "Google",
  },
  {
    name: "Mason Gooding",
    rating: 5,
    text: "Minute Maids is the best! Lacee left my place looking even better than when I moved in and she was done before I even knew it! Highly recommend Minute Maids for any household cleaning tasks!",
    source: "Google",
  },
];
