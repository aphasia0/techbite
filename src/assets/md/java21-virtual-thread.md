## Java 21 and Virtual Threads: Why You Should Not Miss This Feature

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


