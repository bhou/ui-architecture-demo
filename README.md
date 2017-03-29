# About this demo
Nowadays, most of the application start from a framework/library, and think of how to implement the application with the specific framework/library. Lots of tutorials/boilerplate projects teach you how to code with a specific framework/library. With this approach, your code is tightly binded to a special framework.

In this demo app, I will show you that a few lines of code (≈160) can help you make your application independent to the framework/library.

For example: this simple counter app, is implemented with 5 different ways/frameworks/libraries (vanillar javascript, react, angular2, vue.js, and d3), and they share the same application logic and state. It makes you easily write reusable, framework/library-independent code, so that you can easily change the underlying implementation from one library to another to adapt to your business needs.

source code: [https://github.com/bhou/ui-architecture-demo](https://github.com/bhou/ui-architecture-demo)

# Visualize the data flow

You can see the architecture and data flow of this application in [collar.js](http://collarjs.com) dev server:

```text
# install collar dev server
sudo npm install collar-dev-server

# run it
collar-dev-server
```

open [http://localhost:7500](http://localhost:7500), refresh this page, and check [http://localhost:7500](http://localhost:7500)
