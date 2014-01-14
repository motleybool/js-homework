## JS Homework Assignment

Quick assignment to demonstrate some basic front-end codery.

## Design Assumptions

This app utilizes Angular on the Front-End and Node on the Back-End.  The Node server is really just a proxy for the Amazon API.  I stated out attempting reach out to AWS direct but decided to make use of a fully featured Node Package instead. Not exactly the requirement but hey, JavaScript!

## Setup

Clone the repo into a directory and run the following:

```
npm install
bower install
```

Now go into `lib/controllers/api.js` and insert your Amazon API keys:

```javascript
var prodAdv = aws.createProdAdvClient('API-KEY', 
                                      'SECRET-KEY', 
                                      'ASSOCIATE-TAG');
```

Kick off the server with `grunt serve` and your are ready to rock 

## ToDo

- Turns out the Amazon API responds with some pretty patchy data.  Need to go back and add a ton of marshalling to prevent errors.
- Better sanitize text strip out embedded html
- Implement improved user feedback on search/add actions, maybe some good ol' ajax spinners
- Checkout why API calls seem to be taking forever
- Went with a snap drawer angular directive for the cart, not sure if I like the end result
- Refactor to remove globals from $rootScope
- Fleshout unit & e2e tesing functions in karma
