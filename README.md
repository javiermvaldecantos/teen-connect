# teen-connect
Web application that uses Node.js, Express.js and web sockets to provide a real-time chat service.


 * How to use the app
Go to /project directory and type the command 'npm start' on the terminal. You will be prompted to go to http://localhost:3000. Type that URL on your web browser and you will be able to use the chat!


 * App structure
Under the /project directory there are several files and directories. The most important of them are:
  · app.js
    contains the code that manages most of the server's actions, such as routing HTTP requests to the appropriate route file or receiving chat messages from clients and emitting them.

  · /routes directory
    An HTTP request to the server will be routed to a file inside this folder. For example, if we type 'http://localhost:3000/users' on a web browser, the request will be redirected to /routes/users.js. The file user.js will handle the request and render a web page using a .jade template.
    
  · /views directory
    Contains .jade templates used to render web pages
  
  · /public directory
    Contains other important files, such as CSS stylesheets or JavaScript files that are use for the client side of this web app.
