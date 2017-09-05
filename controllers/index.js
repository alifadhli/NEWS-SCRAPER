'use strict';

const express = require('express'),
      router = express.Router(),
      Article = require('../models/article');

// root route
router.get('/', function(req, res) {
    Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('abc')
        .limit(20)
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'NEWS SCRAPER',
                    subtitle: 'By Y Combinator',
                    articles: articles
                };
                res.render('index', hbsObj);
            }
        });
});

// saved articles
router.get('/saved', function(req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('-date')
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'NEWS SCRAPER by Y Combinator',
                    articles: articles
                };
                res.render('saved', hbsObj);
            }
        });
});

// require controllers
router.use('/api', require('./api'));

module.exports = router;
