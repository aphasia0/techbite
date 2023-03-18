export interface Page {
  id: string;
  title: string;
  filename: string
  image: string;
  subtitle: string;
}

export const blogPages: Page []= [
  {
    id: "why-i-love-tailwind-css",
    title: "Why I love tailwind css",
    subtitle: "In one word: Laziness",
    filename: "assets/md/why-i-love-tailwind-css.md",
    image: "assets/img/tailwind.jpeg"
  },
  {
    id: "dart-tour-part-1",
    title: "Dart Tour",
    subtitle: "Part 1",
    filename: "assets/md/dart-introduction.md",
    image: "assets/img/dart.jpeg"
  }
]
