export type Review = {
  name: string;
  rating: 5 | 4 | 3 | 2 | 1;
  text: string;
  source?: "Google" | "Facebook" | "Yelp";
};

export const reviews: Review[] = [
  {
    name: "Google Reviewer",
    rating: 5,
    text: "Lacee was professional, thorough, and super easy to communicate with. The house looked amazing.",
    source: "Google",
  },
  {
    name: "Google Reviewer",
    rating: 5,
    text: "On time, detailed, and respectful in our home. Great value and we’re booking again.",
    source: "Google",
  },
  {
    name: "Google Reviewer",
    rating: 5,
    text: "Deep clean was worth it — kitchen and bathrooms felt brand new. Highly recommend.",
    source: "Google",
  },
];
