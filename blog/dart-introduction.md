---
title: 'Dart Introduction'
description: 'blog description'
subtitle: 'Part 1'
image: assets/dart.jpeg
published: false
slugs:
    - ___UNPUBLISHED___l13yt49i_12LHHYLkyxXgeXgIya5I8koY5xBf50Nh
---

Dart is a client-optimized language developed by Google. In the early days of Dart, it was intended that this language should become a strong alternative to JavaScript in the browser. Now the Dart language has been pivoted to become a great client-side language in general. It's a great way to write web apps since it compiles down to JavaScript, and it really shines when coupled with Flutter framework allowing to write mobile-first application compiled to native for iOS, Android and Web.

Here below a simple snippet of code:

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

First important concept is every variable in Dart refers to an object i.e. an instance of a class.  The language is type safe: it uses a combination of static type checking and runtime checks to ensure that a variable’s value always matches the variable’s static type, sometimes referred to as "sound typing". It's strongly typed, meaning it has the ability to find bugs at compile time. For example you can avoid to add they type to a variable only if the complier is able to infer it later:

```html  
void printInts(List<int> a) => print(a);

void main() {
  final list = [];
  list.add(1);
  list.add('2');
  printInts(list);
}
```
```html  
error - The argument type 'List<dynamic>' can't be assigned to the parameter type 'List<int>'. - argument_type_not_assignable
```
```html  

void printInts(List<int> a) => print(a);

void main() {
  final list = <int>[];
  list.add(1);
  list.add(2);
  printInts(list);
}
```
By deafult null safety is enable, it means types in your code are non-nullable by default, meaning that variables can’t contain null unless you say they can. With null safety, your runtime null-dereference errors turn into edit-time analysis errors.

To indicate that a variable might have the value null, just add ? to its type declaration:

```html  
int? aNullableInt = null;
```