## Synopsis

This is an election handling system. It accepts and shows the election results for a mock election.
This application was built on the MEAN stack.

A live version of the site can be found  at **[http://ec2-34-207-96-182.compute-1.amazonaws.com:3000/](http://ec2-34-207-96-182.compute-1.amazonaws.com:3000/)**

## Motivation

Built for the intention of creating a rough online voting application to show to Votem.

## Installation

To run locally, you need to have node and npm installed.
You will need to install mongodb, this can be done with <cod>npm install mongodb</code>
You can download the files to your local machine and run <code>npm install</code> to download the dependencies.
After, you should be able to run <code>node server.js</code> to run the application and view it at localhost:3000.

A note, the application uses a database titled Votem_db and has existing collectoins "users" and "regions". You will not be able to log into the system if there is no users table populated correctly.

## API Reference

- **[<code>GET</code> login]** 
- **[<code>POSt</code> login]**

- **[<code>GET</code> logout]**

- **[<code>GET</code> vote]**
- **[<code>POST</code> vote/:id]**

- **[<code>GET</code> totalvotes/:id]**

## Contributors

Application written by Kuong Tran
