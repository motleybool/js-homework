## JS Homework Assignment

Quick assignment to demonstrate some basic front-end codery.

## Design Assumptions

This app utilizes Angular on the Front-End and Node on the Back-End.  The Node server is really just a proxy for the Amazon API.  I stated out attempting reach out to AWS direct but decided to make use of a fully featured Node Package instead. Not exactly the requirement but hey, JavaScript!

## Setup

Clone the repo into a directory and run the following:

  npm install
  bower install
  
Now go into `lib/controllers/api.js` and insert your Amazon API keys:

```javascript
var prodAdv = aws.createProdAdvClient('API-KEY', 
                                      'SECRET-KEY', 
                                      'ASSOCIATE-TAG');
```

Kick off the server with `grunt serve` and your are ready to rock 

## ToDo

