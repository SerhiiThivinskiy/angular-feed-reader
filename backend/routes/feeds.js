let express = require('express');
let request = require('request');
let FeedParser = require('feedparser');

let router = express.Router();

router.get('/feed', function (req, res, next) {
    console.log('Getting feed from ', req.query.feedUrl);

    let feedRequest = request(req.query.feedUrl);
    let feedParser = new FeedParser({addmeta: false});
    let feed = {
        info: {},
        articles: []
    };

    feedRequest.on('error', function (error) {
        console.log('feedRequest onError handler error: ', error);
        next(new Error('Error on getting feed'));
    });

    feedRequest.on('response', function (res) {
        if (res.statusCode !== 200) {
            console.log('feedRequest onResponse handler failed response: ', res);
            next(new Error('Error on getting feed'));
        } else {
            this.pipe(feedParser);
        }
    });

    feedParser.on('error', function (error) {
        console.log('feedParser onError handler error: ', error);
        next(new Error('Error on getting feed'));
    });

    feedParser.on('meta', function (info) {
        feed.info = info;
    });

    feedParser.on('readable', function () {
        let article;
        while (article = this.read()) {
            feed.articles.push(article);
        }
    });

    feedParser.on('end', function () {
        console.log("feedParser onEnd handler: sending response ", feed);
        res.send(feed);
    });
});

module.exports = router;
