export interface Page {
  id: string;
  title: string;
  filename: string
  image: string;
  subtitle: string;
  imageStyle: string;
  date: string; // ISO format for sorting
}

export const blogPages: Page[] = [
  {
    id: "why-i-love-tailwind-css",
    title: "Why I love tailwind css",
    subtitle: "In one word: Laziness",
    filename: "assets/md/why-i-love-tailwind-css.md",
    image: "assets/img/tailwind.jpeg",
    imageStyle: "cover",
    date: "2023-10-01"
  },
  {
    id: "dart-tour-part-1",
    title: "Dart Tour",
    subtitle: "Part 1",
    filename: "assets/md/dart-introduction.md",
    image: "assets/img/dart.jpeg",
    imageStyle: "cover",
    date: "2023-11-15"
  },
  {
    id: "lombok-yes-i-like-it",
    title: "Should you use Lombok project in modern Java?",
    subtitle: "Short answer: yes",
    filename: "assets/md/lombok.md",
    image: "assets/img/lombok.webp",
    imageStyle: "scale",
    date: "2023-12-20"
  },
  {
    id: "java21-virtual-thread",
    title: "Java 21 and Virtual Threads",
    subtitle: "Why you should not miss this feature",
    filename: "assets/md/java21-virtual-thread.md",
    image: "assets/img/thread.jpeg",
    imageStyle: "cover",
    date: "2024-01-10"
  },
  {
    id: "ollama-local-llm",
    title: "Run Local LLM with Ollama",
    subtitle: "You need a big GPU to run this",
    filename: "assets/md/ollama-local-llm.md",
    image: "assets/img/ollama-local-llm.webp",
    imageStyle: "cover",
    date: "2024-05-22"
  },
  {
    id: "nano-banana-5-prompt",
    title: "How powerful is nano banana?",
    subtitle: "A lot, you need just the right recipe",
    filename: "assets/md/nano-banana-5-prompt.md",
    image: "assets/img/nano-banana-1.png",
    imageStyle: "cover",
    date: "2025-01-05"
  },
  {
    id: "n8n-integration-trick",
    title: "Supercharge Workflows with n8n",
    subtitle: "Master the Merge Node",
    filename: "assets/md/n8n-integration-trick.md",
    image: "assets/img/n8n-hero.webp",
    imageStyle: "cover",
    date: "2026-02-07"
  }
]
