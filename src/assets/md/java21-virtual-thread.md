Java 21 is with us since September 2023, it will stay with us for longer time since it is the new long-term support (LTS) runtime
after JDK 17.


This release is full of new feature like [Record Patterns](https://openjdk.org/jeps/440), which enhances the Records. *Spoiler alert*
blame me, but I still prefer [Lombok](https://antoniogiordano.dev/blog/lombok-yes-i-like-it). 

Another great feature is that we finally have the
[Pattern Matching for switch](https://openjdk.org/jeps/441),
which means you can do cool stuff like the following:
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
However, the most interesting feature by far is [Virtual Threads](https://openjdk.org/jeps/444).

It has been a long journey for Virtual Thread, Project Loom was started as an attempt by the OpenJDK community to introduce a lightweight concurrency construct to Java.

# Threads so far

Multithreading is one corner stone of Java since three decades and programmers created a 
lot of concurrent server application on it. The most common approach has been the 
one Thread per request style. Threads in Java have been always bound to OS threads which are costly, therefore we cannot
start too many of them.

For this reason we use extensively the concept of Pool, we keep a certain amount of 
Thread in a pool, and then we put all our hundreds/thousands of requests in this pool, hoping (or coding accordingly to avoid it) that 
the single request will always be fast enough to not generate a big queue.

Thea main point here is the I/O operation, which are by nature long and not predictable,
wa can take as an example an HTTP request or a write on a file system. It *might* be fast enough to avoid
queueing up but if it slows down for any reason (bad network speed or busy storage device) then we're in trouble.

To overcome this, reactive programming has been used a lot to scale java application.
Reactive programming is a declarative programming paradigm that is based on the idea of asynchronous event processing and data stream.
The basic idea is to never stop and wait for some other code to complete but instead send events and wait for a callback result.


The main advantage of this approach is that the precious OS Thread is not blocked by our code waiting for the HTTP or storage answer, instead it would wait 
and when the result is ready then our application code can have some thread time to execute the needed job *after* receiving the result.

The main drawback of this Reactive approach is that it changes a lot the code style and complicated the debugging.
You pass from the familiar imperative language to something like this:

```java
public Mono<Product> createProduct(final Tuple2<String, productdto> tuple2) {
    final Product productdto = tuple2.getT2();
    return Mono.just(tuple2.getT1())
        .map(cartRepository::findById)
        .defaultIfEmpty(cartRepository.save(
            cart.builder()
                .id(tuple2.getT1())
                .build()))
        .flatMap(cartres -> cartres)
        .flatMap(cartres -> {
             final Product product = Product.builder()
                 .id(1234)
                 .productId(productDTO.getProductId())
                 .productName(productDTO.getProductName())
                 .build();
             return productRepository.save(product)
                 .map(saveCart -> cart.builder()
                     .id(cartres.getId()).build())
                 .flatMap(cartRepository::save);
        });
    }).then(Mono.just(productDto));
}
```

With great tool like Spring WebFlux and Project Reactor you can achieve peek of throughput
and efficiency at the expense of readability and maintainability since it's harder to find programmer skilled
on reactive stream programming. 

# Threads now on Java 21

Virtual Threads is a game changer, and the main reason is described in the goals of JDK Enhancement Proposal (or JEP) 444:

- Enable server applications written in the simple thread-per-request style to scale with near-optimal hardware utilization.

- Enable existing code that uses the *java.lang.Thread* API to adopt virtual threads with minimal change.

Basically what they achieved is to make available virtual threads, and therefore reactiveness, to imperative applications
written years ago with 0 or near 0 code changes. Thread class is still there, 
together with Runnable and Callable, what changes is your pool. For example passing from a *Executors.newFixedThreadPool(10)* pool to  *Executors.newVirtualThreadPerTaskExecutor()*:
```java
try (ExecutorService myExecutor = Executors.newVirtualThreadPerTaskExecutor()) {
Future<?> future = myExecutor.submit(() -> System.out.println("Running thread"));
future.get();
System.out.println("Task completed");
// ...

```

You don't need to mind about how many Thread you have, you can (and encouraged to) sping millions of Virtual Threads if you need. 
The magic is however, when code running in a virtual thread calls a blocking I/O operation, 
the Java runtime suspends the virtual thread until it can be resumed. The OS thread associated with the suspended virtual thread is now free to perform operations for other virtual threads.


# Credits

I badly explained what is the biggest point to me, if you want here below I have added ©some better and 
complete information about Virtual Threads:

- [JEP 444](https://openjdk.org/jeps/444)
- [Virtual Threads in Spring Boot](https://www.danvega.dev/blog/virtual-threads-spring-boot)
- [Virtual Threads from oracle](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)
