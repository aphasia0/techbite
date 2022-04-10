---
title: 'Dart Tour'
description: 'blog description'
subtitle: 'Part 1'
image: 'assets/dart.jpeg'
published: true
---

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
