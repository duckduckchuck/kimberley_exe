// ### Libraries and globals
var request = require('request');
var _ = require('underscore.deferred');
var Twit = require('twit');
var T = new Twit(require('./config.js'));
var rita = require('rita');
var r = rita.RiTa;

var baseUrl = 'http://news.google.com';



// STATIC THINGS

var verb = ['Admits',
    'Adopts',
    'Agrees',
    'Announces',
    'Approves',
    'Attends',
    'Awakens',
    'Bears',
    'Begins',
    'Blinks',
    'Breaks',
    'Brings',
    'Bumps',
    'Calls',
    'Calls',
    'Catches',
    'Celebrates',
    'Clears',
    'Comes',
    'Compares',
    'Confirms',
    'Considers',
    'Convinces',
    'Covers',
    'Covers',
    'Defends',
    'Dines',
    'Discusses',
    'Does',
    'Enjoys',
    'Expels',
    'Expires',
    'Explains',
    'Fails',
    'Feels',
    'Finds',
    'Garners',
    'Gets',
    'Gives',
    'Goes',
    'Goes',
    'Gushes',
    'Hangs',
    'Hardens',
    'Has',
    'Hears',
    'Helps',
    'Hopes',
    'Inspires',
    'Is',
    'Is',
    'Jacks',
    'Joins',
    'Joins',
    'Knows',
    'Launches',
    'Leads',
    'Leaves',
    'Lets',
    'Lets',
    'Licks',
    'Lies',
    'Listens',
    'Lives',
    'Looks',
    'Looks',
    'Loses',
    'Makes',
    'Makes',
    'Means',
    'Meets',
    'Meets',
    'Misses',
    'Needs',
    'Offers',
    'Opens',
    'Pays',
    'Pierces',
    'Plays',
    'Poses',
    'Pours',
    'Prepares',
    'Promotes',
    'Pushes',
    'Puts',
    'Reaches',
    'Reacts to',
    'Recalls',
    'Recovers',
    'Reflects',
    'Remakes',
    'Remembers',
    'Responds',
    'Responds',
    'Reunites',
    'Reuses',
    'Reveals',
    'Reveals',
    'Rides',
    'Runs',
    'Says',
    'Screams',
    'Sees',
    'Sees',
    'Serves',
    'Shows',
    'Shuts',
    'Sings',
    'Sits',
    'Slams',
    'Snaps',
    'Spends',
    'Starts',
    'Stops',
    'Suffers',
    'Takes',
    'Takes',
    'Teases',
    'Tells',
    'Thinks',
    'Tries',
    'Turns',
    'Unearths',
    'Unveils',
    'Updates',
    'Upgrades',
    'Vows',
    'Waits',
    'Wants',
    'Watches',
    'Wears',
    'Welcomes',
    'Wins'
]

var kardashian = ['Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kim Kardashian', 'Kanye West', 'Kanye West', 'Kanye West', 'Kanye West', 'Kanye West', 'Kanye West', 'Kanye West', 'Kanye West', 'Kourtney Kardashian', 'Khloe Kardashian', 'Kendall Jenner', 'Kendall Jenner', 'Kendall Jenner', 'Kendall Jenner', 'Kris Jenner']

// ### Utility Functions

// This function lets us call `pick()` on any array to get a random element from it.
Array.prototype.pick = function() {
    return this[Math.floor(Math.random() * this.length)];
};

// This function lets us call `pickRemove()` on any array to get a random element
// from it, then remove that element so we can't get it again.
Array.prototype.pickRemove = function() {
    var index = Math.floor(Math.random() * this.length);
    return this.splice(index, 1)[0];
};

// REQUEST SETUP
var options = {
    url: 'https://www.kimonolabs.com/api/81knuqdy?apikey=pmlXPfoYpPxD5L28sAJdV7JEXwB6AtFO',
    headers: {
        'User-Agent': 'request'
    }
};

function getHeadlines() {
    var headlines = [];
    var dfd = new _.Deferred();
    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            for (i = 0; i < info.results.collection1.length; i++) {
                // console.log(info.results.collection1[i].headline);
                headlines.push(info.results.collection1[i].headline);
            };
            // console.log(headlines);
            dfd.resolve(headlines);
        } else {
            dfd.reject();
        }
    });
    // The function returns a promise, and the promise resolves to the array of topics.
    return dfd.promise();
}

function cutSentence(headline) {
    var tokenized = r.tokenize(headline);
    var POS = r.getPosTags(tokenized);
    // var position = POS.indexOf("vbz");
    if (POS.indexOf('vbz') > -1 &&
        tokenized[POS.indexOf('vbz')] !== "is" &&
        tokenized[POS.indexOf('vbz')] !== "Is") {
        var tokenizedShortened = tokenized.splice(POS.indexOf("vbz") + 1, tokenized.length);
        finalResult = r.untokenize(tokenizedShortened);
        var newHeadline = kardashian.pick() + ' ' + verb.pick() + ' ' + finalResult;
        console.log(newHeadline);
        return newHeadline;

    } else if (POS.indexOf('vbd') > -1) {
        var tokenizedShortened = tokenized.splice(POS.indexOf("vbd") + 1, tokenized.length);
        finalResult = r.untokenize(tokenizedShortened);
        var newHeadline = kardashian.pick() + ' ' + verb.pick() + ' ' + finalResult;
        console.log(newHeadline);
        return newHeadline;

    } else if (tokenized[POS.indexOf('vbz')] == "is" ||
        tokenized[POS.indexOf('vbz')] == "Is") {
        var tokenizedShortened = tokenized.splice(POS.indexOf("vbz"), tokenized.length);
        finalResult = r.untokenize(tokenizedShortened);
        var newHeadline = kardashian.pick() + ' ' + finalResult;
        console.log(newHeadline);
        return newHeadline;

    } else if (tokenized.indexOf(':') > -1) {
        var tokenizedShortened = tokenized.splice(tokenized.indexOf(":"), tokenized.length);
        finalResult = r.untokenize(tokenizedShortened);
        var newHeadline = kardashian.pick() + finalResult;
        console.log(newHeadline);
        return newHeadline;

    } else {
        return "NOPE";
    }
}

function analyzeText(rawText) {
    var finalResult = "";
    var tokenized = RiTa.tokenize(rawText);
    console.log(tokenized);
    var POS = RiTa.getPosTags(tokenized);
    console.log(POS);
    var position = POS.indexOf("vbz");
    var tokenizedShortened = tokenized.splice(position + 1, tokenized.length);
    console.log(tokenizedShortened);
    finalResult = RiTa.untokenize(tokenizedShortened);
    console.log(finalResult)
    return finalResult;
}

function tweet() {
    // var categoryCodes = ['w', 'n', 'b', 'tc', 'e', 's'];
    getHeadlines().then(function(headlines) {
        var headline = headlines.pickRemove();
        // console.log(headline);

        var newHeadline = cutSentence(headline);
        // console.log(newHeadline);
        if (newHeadline != "NOPE") {
            T.post('statuses/update', {
                    status: newHeadline

                }, function(err, reply) {
                    if (err) {
                        console.log('error:', err);
                    } else {
                        console.log('reply:', reply);
                    }
                });
            // console.log(newHeadline)
            } else {
                tweet();
                // console.log(newHeadline)
            }
    });
}

// Tweets once on initialization.
tweet();

setInterval(function () {
  try {
    tweet();
  }
  catch (e) {
    console.log(e);
  }
}, 60000 * 60);
