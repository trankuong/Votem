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
* [Login Route](#login)
* [Logout Route](#logout)
* [Vote Route](#vote)
* [Totalvotes Route](#totalvotes)

### Login
- **<code>GET</code> /login** - Returns status code and object identifying if use is logged in, checks using sessions
User has no session
```
{
  error: "Not logged in"
}
```
User has a session
```
{
  success: "Already logged in"
}

```
- **<code>POST</code> /login** - Handles sending login information. Takes in key value paires for __user__ and __password__. Creates a session for max of 20 minutes.

### Logout
- **<code>GET</code> /logout** - Destroys user's session.

### Vote
- **<code>GET</code> /vote** - Determines is the user has already voted
If the user has voted in elections, it will return an array of all elections voted in
```
{
  'electionids' : [1, 2, 3]
}
```
- **<code>POST</code> /vote/:id** - Handles ballot submissions
Takes in an object that has keys __password__ and __form__.
Form needs to be an object with values being strings or arrays.

### Totalvotes
- **<code>GET</code> /totalvotes/:id** - Returns a json object of all the election results for the election specified by the id
For non-ranking ballot fields
```
{
  question : {
               choice1: amount, 
               choice2: amount
                    ...
              }
}
```
For ranking fields *(where voters rank choices from 1-n)*
```
  question : {
               choice1: [rank, rank, rank],
                           ...
              }
```

## Contributors

Application written by Kuong Tran
