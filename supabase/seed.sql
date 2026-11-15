-- Seed data for public.blog_pages.
-- Run after supabase/schema.sql. Safe to re-run: rows are upserted by id.

begin;

insert into public.blog_pages
  (id, title, subtitle, content, image_url, image_style, published_at)
values
  ('why-i-love-tailwind-css', 'Why I love tailwind css', 'In one word: Laziness', $md$In this article I'm going to describe *four* main reason why I love so much
[tailwindcss](https://tailwindcss.com).


# 1. Speed up the development process

Usually whenever you need to add style to your page you need to context 
switch from one file (.html) to another (.css). 
With tailwind css you have a Utility-First tool where almost all the needed css
instruction are made available in pre-existing classes. 
You need only to use them directly in the .html file without writing a single line of CSS.

So you pass from this:

```html  
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```  

To this:

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```  

Wait a moment, I know what you’re thinking. What about the [separation of concern](https://en.wikipedia.org/wiki/Separation_of_concerns) design principle:


## Each section addresses a separate concern, a set of information that affects the code of a computer program Obtaining the exact same design.
That is right, but think a moment to the benefit you gain:


* You aren’t wasting energy inventing class names. And trust me, when you come up with a css class name then you need to remember it in order to “reuse” it effectively

* Near zero context switch: you can focus on your page layout

When you realize how _productive_ you can be working exclusively in HTML with predefined utility classes, working any other way will feel like torture.

# 2. Responsive Design made easy

There are lots of utility, framework or library that makes this possible, but in this Tailwind CSS really shines. By default, Tailwind uses a mobile first breakpoint system, where the default is the mobile screen, then 
if you want to change the layout you can simply override it:


```html
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>

```

# 3. Dark Mode in one keyword

Here how to set the layout for dark mode, it is done exactly in the same file together with the bright version:

```html
 <!-- Will be automatically black or white depeneding on the operating system preference -->
  <div class="bg-white dark:bg-black">
    <!-- ... -->
  </div>

```

If you want to manually handle this just put a *dark* class  in the HTML tree:

```html
<!-- Dark mode enabled -->
<html class="dark">
<body>
  <!-- Will be black -->
  <div class="bg-white dark:bg-black">
    <!-- ... -->
  </div>
</body>
</html>

```
# 4. Ready For Production

Tailwind CSS is incredibly performance focused and aims to produce the smallest CSS file possible by only generating the CSS you are actually using in your project.

During the build phase for production tailwind is able to cut all the classes not needed from your css file. Creating a css file so small you don’t have to worry about complex solutions like code-splitting your CSS for each page, and can instead just ship a single small CSS file that’s downloaded once and cached until you redeploy your site.



# Credits

[Tailwind CSS](https://tailwindcss.com)

[Tailwind CSS: Dark Mode](https://tailwindcss.com/docs/dark-mode)

[Tailwind CSS: Responsive Design](https://tailwindcss.com/docs/responsive-design)
$md$, 'assets/img/tailwind.jpeg', 'cover', '2023-10-01'::date),
  ('dart-tour-part-1', 'Dart Tour', 'Part 1', $md$
Dart is a client-optimized language developed by Google. In the early days of Dart, it was intended that this language should become a strong alternative to JavaScript in the browser. 

Now the Dart language has been pivoted to become a great client-side language in general. It's a great way to write web apps since it compiles down to JavaScript, and it really shines when coupled with Flutter framework allowing to write mobile-first application compiled to native for iOS, Android and Web.

# How Dart looks like

Here below a simple snippet of code. The execution starts from the *main* function, we declare a variable - notice without a type, we'll talk about this later - and call the function *printInteger*.

  ```html  
  // Define a function.
  void printInteger(int aNumber) {
    print('The number is $aNumber.'); // Print to console.
  }
  
  // This is where the app starts executing.
  void main() {
    var number = 42; // Declare and initialize a variable.
    printInteger(number); // Call a function.
  }
  
  ```

# Every variable refers to an object

First important concept is **every variable in Dart refers to an object** i.e. an instance of a class.  Even numbers, functions, and null are objects. With the exception of null (if you enable sound null safety), all objects inherit from the Object class.

The language is type safe: it uses a combination of static type checking and runtime checks to ensure that a variable’s value always matches the variable’s static type, sometimes referred to as "sound typing". 

Even numbers, functions, and null are objects. With the exception of null (if you enable sound null safety), all objects inherit from the Object class.
It's strongly typed, meaning it has the ability to find bugs at compile time. For example, you can avoid adding the type to a variable only if the compiler is able to infer it later:

```html  
void printInts(List<int> a) => print(a);

void main() {
  final list = [];
  list.add(1);
  list.add('2');
  printInts(list);
}
```

Here the compiler complains about:

```html  
error - The argument type 'List<dynamic>' can't be assigned to the parameter type 'List<int>'. - argument_type_not_assignable
```

In order to fix it we must add the type to the List, yes Dart supports generics:

```html  

void printInts(List<int> a) => print(a);

void main() {
  final list = <int>[];
  list.add(1);
  list.add(2);
  printInts(list);
}
```

# Null safety as first citizen

By default, null safety is enable so types in your code are non-nullable by default, meaning that variables can’t contain null unless you say they can. With null safety, your runtime null-dereference errors turn into edit-time analysis errors.

To indicate that a variable might have the value null, just add *"?"* to its type declaration:

```html  
int? aNullableInt = null;
```

Often Dart’s control flow analysis can detect when a non-nullable variable is set to a non-null value before it’s used, but sometimes analysis fails.
If you’re sure that a variable is set before it’s used, but Dart disagrees, you can fix the error by marking the variable as late:

```html 
late String description;

void main() {
  description = 'Feijoada!';
  print(description);
}
```

The late modifier has two use cases:

- Declaring a non-nullable variable that’s initialized after its declaration.
- Lazily initializing a variable.

# Final and const
If you never intend to change a variable, use final or const, either instead of var or in addition to a type. A final variable can be set only once; a const variable is a compile-time constant. (Const variables are implicitly final.)

```html 
final name = 'Pep'; // Without a type annotation
final String nickname = 'Pepp';
```
You can’t change the value of a final variable:
```html
name = 'Ugo'; // Error: a final variable can only be set once.
```

name = 'Ugo'; // Error: a final variable can only be set once.
# Supported types

The Dart language has special support for the following:

### **Numbers (int, double)**
### **Strings (String)**
### **Booleans (bool)**
### **Lists (List, also known as arrays)**
### **Sets (Set)**
### **Maps (Map)**
### **Runes (Runes; often replaced by the characters API)**
### **Symbols (Symbol)**
### **The value null (Null)**

# Credits

[Dart dev](https://dart.dev/guides/language/language-tour)
$md$, 'assets/img/dart.jpeg', 'cover', '2023-11-15'::date),
  ('lombok-yes-i-like-it', 'Should you use Lombok project in modern Java?', 'Short answer: yes', $md$Lombok is a popular Java library that helps developers reduce boilerplate code in their projects.
It provides a set of annotations that generate code automatically at compile-time, reducing the amount of manual coding required.


Lombok is compatible with popular IDEs such as Eclipse, IntelliJ IDEA, and NetBeans, and can be easily integrated with Maven and Gradle.

# Annotations examples

Lombok's annotations provide various features that enhance code quality, readability, and maintainability. 
Some of the commonly used annotations are:

```java 
//Generates getter methods for class fields
@Getter
// Generates setter methods for class fields
@Setter
// Generates a no-argument constructor
@NoArgsConstructor
//Generates a constructor with all arguments
@AllArgsConstructor
// Generates a toString() method
@ToString
//Generates equals() and hashCode() methods
@EqualsAndHashCode
//Generates getter and setter methods, toString(), equals(), and hashCode() methods, as well as a constructor with all arguments
//Very useful with framework like Hibernate
@Data
//Generates a builder pattern for the annotated class
@Builder
```

# Why I like it
Lombok's annotations help developers write cleaner, more concise, and more maintainable code by reducing the amount of boilerplate code.
This makes the code easier to read and understand, and reduces the likelihood of errors.

Lombok has become popular among Java developers because it helps them write better code faster.
The library has a large and active community of developers who contribute to its development, provide support, and create new features. 

I use it in every java project for the following reason:
- Reduced Boilerplate Code: One of the primary reasons why Lombok is a good option for Java developers is that it helps in reducing the amount of boilerplate code that developers need to write. Lombok provides annotations such as @Getter, @Setter, and @ToString that generate the code automatically, reducing the amount of manual coding required
- Increased Productivity: By reducing the amount of boilerplate code, Lombok increases productivity by enabling developers to focus on writing business logic instead of repetitive and time-consuming code.
- Improved Code Readability: Lombok’s annotations improve code readability by providing a more concise and expressive syntax. This helps in reducing the amount of code that developers need to write, making the code easier to read and understand.
- Easy Integration: Lombok is easy to integrate with existing projects and frameworks. It works seamlessly with popular IDEs such as Eclipse and IntelliJ IDEA, and can be integrated with popular build tools such as Maven and Gradle.
- Active Community Support: Lombok has an active community of developers who contribute to its development, provide support, and create new features. This ensures that Lombok is constantly evolving and improving, making it a reliable and efficient tool for Java developers.


# Why (some) does not like it
Some developers have raised concerns about the use of Lombok in production code. 
Some argue that the generated code may not be as efficient as hand-written code, and that the annotations may make the code less readable and maintainable in the long term. Additionally, some developers may find it challenging to debug generated code.

# Java Records
Starting from java 14 we have some similar functionality built in into the language

```java 
public record Person (String name, String address) {}
```
Records are immutable data classes that require only the type and name of fields.
The equals, hashCode, and toString methods, as well as the private, final fields and public constructor, are generated by the Java compiler.

It's similar to the @Data annotation in lombok, but java record are immutable object so private, final field for each piece of data and only getter are created.

In my opinion Java record are a good option but misses a lot of flexibility and functionality present in Lombok. 

I can give you another example, we all use *slf4j* to log our code execution, usually the pattern is always the same:
```java 
public class HelloWorld{
    Logger log = LoggerFactory.getLogger(HelloWorld.class);
}
```
I ugually copy past it from other classes. With Lombok, it's a simple annotation, and the log is ready. 
The variable will always be called *log* and you don't need to remember to change the class name neither how to get an instance of a logger.

```java 
//Generates a logger field for the class, which can be used to log messages
@Slf4j
public class HelloWorld{
}
```
$md$, 'assets/img/lombok.webp', 'scale', '2023-12-20'::date),
  ('java21-virtual-thread', 'Java 21 and Virtual Threads', 'Why you should not miss this feature', $md$## Java 21 and Virtual Threads: Why You Should Not Miss This Feature

Java 21 has been available since September 2023 and is set to stay with us for a long time as it replaces JDK 17 as the new long-term support (LTS) runtime. This release is packed with exciting features, including Record Patterns, which enhance the functionality of Records. Personally, I still prefer Lombok for its simplicity, but these new additions are impressive.

Another notable feature is Pattern Matching for `switch`, which allows for expressive and concise code like the following example:

```java
static String formatterPatternSwitch(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("int %d", i);
        case Long l    -> String.format("long %d", l);
        case Double d  -> String.format("double %f", d);
        case String s  -> String.format("String %s", s);
        default        -> obj.toString();
    };
}
```

However, the most groundbreaking feature in Java 21 is Virtual Threads.

---

### The Journey to Virtual Threads

Virtual Threads have been a long time coming. They originated from Project Loom, an OpenJDK initiative aimed at introducing lightweight concurrency constructs to Java.

#### Threads in Java So Far

Multithreading has been a cornerstone of Java for decades, enabling developers to create highly concurrent server applications. The most common approach has been the “one thread per request” model. In this approach, each request is handled by a dedicated thread. However, Java threads are tied to OS threads, which are resource-intensive, so the number of threads is limited by the operating system.

To address this, thread pools became a common practice. Developers keep a fixed number of threads in a pool and queue requests to be processed by these threads. While effective, this approach can lead to bottlenecks, especially for operations like I/O that are inherently unpredictable and slow. For example, an HTTP request or file system write might cause delays due to network or storage issues. When such operations block threads, they risk creating long queues.

To overcome these limitations, many developers turned to reactive programming. Reactive programming avoids blocking threads by using asynchronous event-driven paradigms, allowing applications to handle more concurrent requests. The downside is that reactive programming often results in complex, less readable code that is harder to debug. For example:

```java
public Mono<Product> createProduct(final Tuple2<String, ProductDTO> tuple2) {
    final ProductDTO productDTO = tuple2.getT2();
    return Mono.just(tuple2.getT1())
        .map(cartRepository::findById)
        .defaultIfEmpty(cartRepository.save(
            Cart.builder()
                .id(tuple2.getT1())
                .build()))
        .flatMap(cartRes -> cartRes)
        .flatMap(cartRes -> {
             final Product product = Product.builder()
                 .id(1234)
                 .productId(productDTO.getProductId())
                 .productName(productDTO.getProductName())
                 .build();
             return productRepository.save(product)
                 .map(savedCart -> Cart.builder()
                     .id(cartRes.getId())
                     .build())
                 .flatMap(cartRepository::save);
        });
}
```

While frameworks like Spring WebFlux and Project Reactor enable impressive throughput, they come at the cost of readability and maintainability.

---

### Virtual Threads in Java 21

Virtual Threads are a game changer. The main goal of JDK Enhancement Proposal (JEP) 444 is:

- To enable server applications written in the simple “thread-per-request” style to scale with near-optimal hardware utilization.
- To allow existing code using the `java.lang.Thread` API to adopt Virtual Threads with minimal changes.

This means that Virtual Threads bring the scalability of reactive programming to imperative applications with little or no code modification. The `Thread` class, along with familiar constructs like `Runnable` and `Callable`, remains unchanged. The difference lies in the thread pool. For example:

```java
try (ExecutorService myExecutor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<?> future = myExecutor.submit(() -> System.out.println("Running thread"));
    future.get();
    System.out.println("Task completed");
}
```

With Virtual Threads, you no longer need to worry about thread limits. You can spin up millions of Virtual Threads if necessary. When a Virtual Thread performs a blocking I/O operation, the Java runtime suspends it and frees the associated OS thread to handle other tasks. This efficient management makes Virtual Threads a powerful tool for modern applications.

---

### Why Virtual Threads Matter

Virtual Threads simplify concurrent programming by:

1. **Enhancing Scalability:** Applications using the thread-per-request model can now handle vastly more concurrent requests.
2. **Maintaining Simplicity:** Developers can write code in a familiar, imperative style without needing to adopt reactive paradigms.
3. **Minimizing Changes:** Existing applications can adopt Virtual Threads with minimal modifications.

---

### Conclusion

Java 21’s Virtual Threads are a transformative feature, enabling efficient, scalable, and simpler concurrent programming. If you want to explore this feature further, here are some excellent resources:

- [JEP 444](https://openjdk.org/jeps/444)
- [Virtual Threads in Spring Boot](https://spring.io/blog/2023/virtual-threads)
- [Virtual Threads from Oracle](https://www.oracle.com/java/technologies/virtual-threads.html)


$md$, 'assets/img/thread.jpeg', 'cover', '2024-01-10'::date),
  ('ollama-local-llm', 'Run Local LLM with Ollama', 'You need a big GPU to run this', $md$## Running Open Source AI Models Locally with Ollama: A Beginner's Guide

Ollama is an emerging tool that simplifies running open-source AI models locally, enabling developers to experiment with cutting-edge machine learning without relying on cloud infrastructure. This guide explains how to set up Ollama, run an open-source model, and understand the required resources. We'll also explore performance expectations, especially on older machines.

---

### Why Run Models Locally?

Running models locally has several benefits:

1. **Data Privacy:** Your data stays on your machine, enhancing security.
2. **Cost Savings:** Avoiding cloud compute costs is particularly beneficial for hobbyists and small projects.
3. **Offline Capability:** No internet connection is needed to use the models.

However, running models locally can be resource-intensive, especially for large-scale models.

---

### Prerequisites for Using Ollama

Before diving in, ensure your system meets the following requirements:

1. **Hardware:**
   - A modern CPU with multiple cores (e.g., Intel i7 or AMD Ryzen 5 and above).
   - At least 16GB of RAM for smaller models and 32GB+ for larger ones.
   - A discrete GPU is recommended for faster inference, though not mandatory.

2. **Software:**
   - A 64-bit operating system (Linux, macOS, or Windows).
   - Installed Ollama CLI (installation instructions below).

Older machines can still run models but expect significantly slower performance.

---

### Installing and Setting Up Ollama

1. **Install Ollama:**
   First, download and install the Ollama CLI from the official website:

   ```bash
   curl -sSL https://ollama.ai/install.sh | bash
   ```

   Follow the on-screen instructions to complete the installation.

2. **Download a Model:**
   Use the `ollama` CLI to download a model. For example, to download a GPT-based model:

   ```bash
   ollama pull llama-2-7b
   ```

3. **Verify Installation:**
   Run the following command to ensure everything is set up correctly:

   ```bash
   ollama list
   ```

---

### Running a Model

Here's how you can interact with a model using the Ollama CLI:

1. **Start the Model:**
   Start the downloaded model with the following command:

   ```bash
   ollama run llama-2-7b
   ```

2. **Send a Query:**
   Once the model is running, you can type a prompt directly into the terminal. For example:

   ```
   > What is the capital of France?
   Paris
   ```

3. **Stop the Model:**
   Press `Ctrl+C` to stop the model when you're done.

---

### Resource Usage and Performance

Running AI models locally demands significant resources. Here’s what to expect:

1. **Modern Machines:**
   - Models run efficiently on machines with sufficient CPU and RAM.
   - GPU acceleration drastically reduces inference time for larger models.

2. **Older Machines:**
   - Running models on older hardware (e.g., 8GB RAM or older CPUs) may be feasible for small models but will be noticeably slower.
   - Expect higher memory usage, which can cause swapping and slow performance.

#### Example Performance Comparison:

| Machine Type         | Model Size  | Average Inference Time |
|----------------------|-------------|-------------------------|
| Modern (32GB RAM, GPU) | 7B Parameters | ~1 second per response |
| Mid-Range (16GB RAM)   | 7B Parameters | ~5 seconds per response |
| Old (8GB RAM, no GPU)  | 7B Parameters | ~30 seconds per response |

---

### Optimizing for Older Machines

If you’re working with older hardware:

1. **Choose Smaller Models:** Opt for smaller, less resource-intensive models.
2. **Reduce Batch Sizes:** Smaller batch sizes can prevent memory overload.
3. **Enable CPU Optimizations:** Use lightweight libraries or CPU-specific configurations for better performance.

---

### Conclusion

Ollama simplifies the process of running open-source AI models locally, making it accessible to developers of all levels. While modern hardware provides the best experience, older machines can still be used with appropriate optimizations and smaller models. With Ollama, you have the power to explore AI capabilities without relying on external services.

For further details, visit the [Ollama documentation](https://github.com/ollama/ollama).

$md$, 'assets/img/ollama-local-llm.webp', 'cover', '2024-05-22'::date),
  ('nano-banana-5-prompt', 'How powerful is nano banana?', 'A lot, you need just the right recipe', $md$## Elevating Data Storytelling with Nano Banana: 5 Essential Prompts

Nano Banana, the state-of-the-art image generation model, is often associated with artistic creation and photo editing. However, it is also a powerful ally for data analysts and presenters. By using Nano Banana, you can move beyond standard Excel charts and create immersive, high-concept visual metaphors that make complex data memorable.

This guide explores how to leverage Nano Banana to generate stunning data visualization concepts, infographic backgrounds, and metaphorical illustrations.

---

### Why Use Generative AI for Data Viz?

While tools like Tableau or PowerBI are perfect for accuracy, generative AI shines in **storytelling**. It helps you:

1. **Create Analogies:** Turn abstract numbers into physical metaphors (e.g., a growing forest for sustainability data).
2. **Design Layouts:** Generate unique, royalty-free backgrounds for dashboards.
3. **Engage Audiences:** Grab attention with isometric 3D illustrations that standard bar charts can't match.

*Note: Generative models excel at the "vibe" and structure of data visualization. For exact numbers and text labels, it is best to generate the base image with Nano Banana and overlay the specific data in your presentation software.*

---

### Top 5 Prompts for Data Visualization

Here are five compelling prompts designed to create versatile, high-quality visualization assets.

#### 1. The Isometric Future City (For Urban or Tech Data)
This prompt creates a clean, detailed environment perfect for overlaying statistics about infrastructure, technology, or smart city growth.

> **Prompt:**
```text
A highly detailed isometric 3D render of a futuristic smart city on a white
background. The city features floating glass data blocks, glowing fiber optic
lines connecting buildings, and green roof gardens. Soft, studio lighting with
a pastel color palette of cyan, white, and soft coral. Minimalist style, high
resolution, 8k, unreal engine 5 render style.
```

![Isometric Smart City](assets/img/nano-banana-1.png)

#### 2. The Abstract Network Sphere (For Connectivity/AI)
Use this for visualizing global networks, social media reach, or neural networks.

> **Prompt:**
```text
A macro photography shot of a glowing translucent sphere composed of
thousands of interconnecting golden nodes and silver threads. Deep blue
gradient background. Shallow depth of field focusing on the center connections.
Cinematic lighting, intricate detail, representing complex data networks.
```

![Abstract Network Sphere](assets/img/nano-banana-2.png)

#### 3. The Paper Cutout Topography (For Demographics/Geography)
A tactile, organic style that works beautifully for environmental reports or demographic layering.

> **Prompt:**
```text
Layered paper art style illustration of a topographic map. distinct layers of
paper in varying shades of teal and emerald green, casting soft realistic
shadows to create depth. clean lines, minimalist design, overhead view.
The layers form a smooth, organic flow representing statistical growth.
```

![Paper Cutout Topography](assets/img/nano-banana-3.png)

#### 4. The Glass Bauhaus Infographic (For Financial/Corporate)
This creates a sophisticated, structured background that implies stability and transparency.

> **Prompt:**
```text
Bauhaus inspired 3D geometric composition. Frosted glass cubes, brushed metal
spheres, and thin matte black connecting rods arranged in an organized,
balanced structure. Soft diffused lighting from the left. Neutral color 
palette of beige, grey, and soft orange. Ultra-clean 3D render suitable for
a financial report background.
```

![Glass Bauhaus Infographic](assets/img/nano-banana-4.png)

#### 5. The Cyberpunk Dashboard UI (For Gaming/Security)
Perfect for high-energy presentations regarding cybersecurity, gaming metrics, or fast-paced markets.

> **Prompt:**
```text
Futuristic HUD interface design, dark mode. Neon purple and laser blue grid 
lines, floating holographic data widgets, and digital waveform aesthetics. 
Dark background with a slight vignette. sharp vector-like lines, sci-fi 
aesthetic, high contrast, 4k digital art.
```

![Cyberpunk Dashboard UI](assets/img/nano-banana-5.png)

---

### Tips for Better Results

To get the most out of Nano Banana for data viz, keep these tips in mind:

1. **Aspect Ratio Matters:** If you are designing for a PowerPoint slide, ensure you request a 16:9 aspect ratio.
2. **Negative Space:** Add keywords like "minimalist" or "lots of white space" to ensure you have room to overlay your own text and numbers later.
3. **Iterate on Style:** If a prompt is too realistic, try adding "vector illustration style" or "flat design" to make it look more like a traditional infographic.

---

### Conclusion

Nano Banana allows you to bridge the gap between raw data and emotional storytelling. By using these prompts, you can generate unique visual assets that set your presentations apart. Whether you need the clean lines of a Bauhaus structure or the complex connectivity of a neural network, the right prompt can turn a boring slide into a work of art.

Start experimenting with these prompts today and transform how you visualize information.
$md$, 'assets/img/nano-banana-1.png', 'cover', '2025-01-05'::date),
  ('n8n-integration-trick', 'Supercharge Workflows with n8n', 'Master the Merge Node', $md$## Supercharge Your Workflows with n8n: The Power of the Merge Node

n8n is a powerful extendable workflow automation tool. With a fair-code distribution model, n8n will always have visible source code, be available to self-host, and allow you to add your own custom functions, nodes and triggers.

![n8n Hero](/assets/img/n8n-hero.webp)

### Why n8n?

Unlike other automation platforms, n8n is highly flexible and can be self-hosted, giving you full control over your data. But the real magic happens when you start exploring its built-in nodes.

---

### The Trick: Master the Merge Node

One of the most common challenges in automation is combining data from different sources. This is where the **Merge Node** shines.

Instead of writing complex logic to wait for multiple triggers or manually joining datasets, the Merge node allows you to combine two streams of data into one effortlessly.

![n8n Merge Workflow](/assets/img/n8n-workflow.webp)

#### How to use it:
1. **Connect two inputs:** Link two different nodes (e.g., a Google Sheets node and an HTTP Request node) to a single Merge node.
2. **Choose your mode:** Use "Append" to simply join the data, or "Merge" to combine items based on a shared key.
3. **Streamline your output:** The resulting combined data can then be sent to a final destination, like a Slack notification or a database update.

This simple trick makes it incredibly easy to build sophisticated integrations without breaking a sweat!

---

### Conclusion

n8n makes automation feel like building with Lego blocks. By mastering simple yet powerful tools like the Merge node, you can automate almost any task in minutes. 

Ready to dive in? Check out the [n8n documentation](https://docs.n8n.io/) to get started!
$md$, 'assets/img/n8n-hero.webp', 'cover', '2026-02-07'::date),
  ('ai-in-the-us', 'AI in the US: Bots, Ballots, and Business Agents', 'What X/Twitter is saying about AI in America right now', $md$## AI in the US: Bots, Ballots, and Business Agents

The American AI scene moves fast, and X (formerly Twitter) is where most of it breaks first. Watching from Europe this week, three stories kept showing up in my feed: xAI turned its Grok Bot into a shared "AI teammate," US voters handed the data-center industry a stunning rebuke at the midterms, and OpenAI opened ChatGPT up to businesses. Here is what actually happened, and why it matters if you write code for a living.

---

### xAI shipped Grok Bot 1.0

xAI announced **Grok Bot 1.0** in early November, calling it a major update to its AI teammates. The pitch is simple: instead of a chatbot you talk to alone, a Bot is a colleague your whole team can share.

Three things changed:

1. **Multiplayer teammates.** You can share a Bot with specific people or groups and bring it into Slack, Microsoft Teams, and video calls. As it works with more people, it learns how the team operates and gets more useful to everyone.
2. **Proactive teammates.** Bots can spot unfinished work, anticipate what a team needs next, and bring a human in when a decision needs judgment.
3. **More capable teammates.** Better browser use, stronger document and slide generation, and smarter approvals that interrupt you less often.

> "Hire Grok @Bot as a colleague and give it your hardest tasks." — Elon Musk, on X

The launch post pulled roughly **5.6 million views** within hours, and Musk quoted it minutes after it went live. Worth noting: xAI merged into SpaceX earlier this year, so the company now brands itself as **SpaceX Super Intelligence**. The "AI teammate" race is officially on.

---

### Voters just said no to data centers

The biggest story in US AI this month was not a product launch. It was an election.

In the 2026 midterms, **41 data-center-related ballot measures** appeared across 10 states. Voters rejected **40 of them** — the only win for the pro-data-center side was in Harwood, North Dakota. An NBC exit poll found that **56% of voters** considered AI and data centers a "crucial or major factor" in their congressional vote, and **76%** opposed new data centers in their own communities.

The political damage was concentrated in the states that matter most for the AI buildout:

| State | Result |
|-------|--------|
| Texas | Elected a Democrat who campaigned on data-center limits |
| Ohio | Senator-elect ran ads branding his opponent "the face of data centers" |
| Georgia | Pro-regulation candidates won statewide |
| Kansas, Iowa, Arizona | Pause-or-guardrails candidates led or won |

Musk, whose companies are deeply invested in AI infrastructure, responded on X:

> "Data centers in space looking pretty appealing right now."

![AI data centers connected to a ballot box](/assets/img/ai-us-ballot.svg)

The backlash is not just symbolic. Local governments are already moving to pause projects or tighten rules, and OpenAI — which has a data center in Texas and projects under construction in Ohio — **pledged to pay for its own electricity** one day after the results. Texas alone has 31 ongoing data-center construction projects, the most of any state. Expect "who pays the power bill" to become a standard line in every AI infrastructure pitch.

---

### OpenAI opened ChatGPT to businesses

On November 10, OpenAI announced **Businesses in ChatGPT** in beta. The headline number: **1.2 billion people** use ChatGPT every week, and businesses now get a way to show up in those conversations.

The key feature is **Business Agents**. Eligible ecommerce and online service businesses in the US can claim a verified profile, publish product feeds with live pricing and availability, and build an agent that answers customer questions inside a clearly labeled conversation. Businesses get aggregated insights on mentions, clicks, and common topics — but OpenAI says it does not share people's conversations or Business Agent chats with businesses.

For developers, this is the interesting part: the interface between "a business" and "an AI assistant" is becoming a first-class product surface. If you build integrations, start thinking about structured product data and agent-friendly endpoints now.

---

### Washington's AI executive order

The policy backdrop is Executive Order 14409, **"Promoting Advanced Artificial Intelligence Innovation and Security,"** signed on June 2, 2026. The short version:

- Modernize federal systems and harden them against cyber threats.
- Create a **voluntary** framework for "covered frontier models," with early government access before release — explicitly *not* a mandatory licensing regime.
- Stand up an AI cybersecurity clearinghouse and expand tech hiring pathways.

The signal for the industry is "innovate fast, but expect scrutiny." For anyone building with frontier models, the practical takeaway is to treat security and evaluation as part of the product, not an afterthought.

---

### What this means for developers

Three threads worth pulling on:

1. **Agents are becoming teammates, not tools.** Grok Bot, Business Agents, and similar products all point the same direction: persistent, shared, proactive AI that works inside your existing apps. If your roadmap assumes a stateless chat widget, it is already behind.
2. **Infrastructure is now a political problem.** The data-center backlash shows that AI's biggest constraint may be power and public consent, not GPUs. Efficiency and "runs anywhere" will matter more than raw scale.
3. **Distribution is shifting to AI surfaces.** With 1.2 billion weekly ChatGPT users, being *answerable* by an AI assistant is becoming as important as ranking on Google. Structured data, APIs, and agent-friendly design are the new SEO.

The US AI story this week was not about a better model. It was about what happens when AI meets teams, voters, and businesses at the same time. That is the part worth building for.

---

### Sources

- [Introducing Grok Bot 1.0 — xAI](https://x.ai/news/grok-bot-1-0)
- [Voters rebuff data centers in every ballot measure except one — CNBC](https://www.cnbc.com/2026/11/04/data-center-ballot-measures-2026-midterm.html)
- [How AI Backlash Shaped the 2026 Midterms — Time](https://time.com/article/2026/11/04/midterm-elections-results-ai-industry-data-centers/)
- [Introducing Businesses in ChatGPT — OpenAI](https://openai.com/index/introducing-businesses-chatgpt/)
- [Promoting Advanced Artificial Intelligence Innovation and Security — The White House](https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/)
$md$, 'assets/img/ai-us-hero.svg', 'cover', '2026-11-14'::date)
on conflict (id) do update set
  title        = excluded.title,
  subtitle     = excluded.subtitle,
  content      = excluded.content,
  image_url    = excluded.image_url,
  image_style  = excluded.image_style,
  published_at = excluded.published_at;

commit;
