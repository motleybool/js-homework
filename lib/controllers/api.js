'use strict';

// Grab AWS Lib
var aws = require("aws-lib");

// Create Product Adv API Object
var prodAdv = aws.createProdAdvClient('API-KEY', 
                                      'SECRET-KEY', 
                                      'ASSOCIATE-TAG');

// AWS Product Search Item Query
exports.search = function(req, res) {
  // Search Parameters
  var options = {SearchIndex: "Blended", 
                 Keywords: req.param('term'),
                 Availability: 'Available',
                 Condition: 'All',
                 ResponseGroup: 'ItemAttributes,Images,EditorialReview,OfferFull,Offers',
                };

  // Launch Search Request
  prodAdv.call("ItemSearch", options, function(err, result) {
    var response = [],
        creator = '', 
        description = '';

    //Build Output Packet
    for(var i in result.Items.Item) {

      var item = result.Items.Item[i];

      //<super hack because API hands back patchy data>
      if((!item.Offers) || (item.Offers.TotalOffers <= '1')) {
        continue;
      }
      //Compute Creator <hack>
      creator = (item.ItemAttributes.Author)?item.ItemAttributes.Author:creator;
      creator = (item.ItemAttributes.Artist)?item.ItemAttributes.Artist:creator;
      creator = (item.ItemAttributes.Director)?item.ItemAttributes.Director:creator;
      //Compute Description <bigger hack>
      description = 'Item description could not be found';
      if(item.EditorialReviews) {
        if(item.EditorialReviews.EditorialReview.Content) {
          description = item.EditorialReviews.EditorialReview.Content;
        }
        if(item.EditorialReviews.EditorialReview[0]) {
          description = item.EditorialReviews.EditorialReview[0].Content;
        }
      }

      //Push item
      response.push({
        listID: item.Offers.Offer[0].OfferListing.OfferListingId,
        title: item.ItemAttributes.Title,
        price: (item.OfferSummary)?item.OfferSummary.LowestNewPrice.Amount / 100:0,
        image: item.MediumImage.URL,
        creator: creator,
        type: item.ItemAttributes.Binding,
        desc: description
      });
    }

    //Send back JSON
    res.json(response);
  });
};

// AWS Cart Functions
//-Get Cart
exports.cart = function (req, res) {

  var options = {'CartId': req.param('cart'),
                 'HMAC': req.param('hmac')};

  prodAdv.call("CartGet", options, function(err, result) {
    var results = [],
        creator = '', 
        description = '';

    results = result;

    //Send back JSON String
    res.json(results);
  });
};
//-Create Cart
exports.cartCreate = function (req, res) {

  var options = {'Item.1.OfferListingId': req.param('item'),
                 'Item.1.Quantity': 1};

  prodAdv.call("CartCreate", options, function(err, result) {
    var results = [];

    results = result;

    //Send back JSON String
    res.json(results);
  });
};
//-Add Item
exports.addToCart = function (req, res) {

};
//-Delete Item
exports.deleteCartItem = function (req, res) {

};

//-ItemLookup
exports.itemLookup = function (req, res) {

  var options = {ItemId: req.param('id'),
                 ResponseGroup: 'OfferFull'
                };

  prodAdv.call("ItemLookup", options, function(err, result) {
    var results = [],
        creator = '', 
        description = '';

    results = result;

    //Send back JSON String
    res.json(results);
  });
};
