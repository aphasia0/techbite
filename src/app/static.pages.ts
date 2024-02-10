export interface Page {
  id: string;
  title: string;
  filename: string
  image: string;
  subtitle: string;
  imageStyle: string;
}

export const blogPages: Page []= [
  {
    id: "why-i-love-tailwind-css",
    title: "Why I love tailwind css",
    subtitle: "In one word: Laziness",
    filename: "assets/md/why-i-love-tailwind-css.md",
    image: "assets/img/tailwind.jpeg",
    imageStyle: "cover"
  },
  {
    id: "dart-tour-part-1",
    title: "Dart Tour",
    subtitle: "Part 1",
    filename: "assets/md/dart-introduction.md",
    image: "assets/img/dart.jpeg",
    imageStyle: "cover"
  },
  {
    id: "lombok-yes-i-like-it",
    title: "Should you use Lombok project in modern Java?",
    subtitle: "Short answer: yes",
    filename: "assets/md/lombok.md",
    image: "assets/img/lombok.webp",
    imageStyle: "scale"
  },
  {
    id: "java21-virtual-thread",
    title: "Java 21 and Virtual Threads",
    subtitle: "Why you should not miss this feature",
    filename: "assets/md/java21-virtual-thread.md",
    image: "assets/img/thread.jpeg",
    imageStyle: "cover"
  },
]
