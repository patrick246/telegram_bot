var https = require('https');
var fs = require('fs');
var bot = require('./bot.js');
var pr0bot = require('./pr0bot.js');
var mailaddress_bot = require('./mailaddress-bot.js');

fs.readFile('./auth_token.txt', 'utf8', function(err, data)
{
    if(err)
        return console.warn(err);

    var auth_tokens = data.replace("\r", "").split('\n');
    if(auth_tokens.length == 0)
    {
        console.warn('Missing auth tokens!');
        return;
    }
	console.log(auth_tokens);
    //var reply_bot = new bot.Bot(auth_tokens[0], reply_bot.reply_handler);
    var my_pr0bot = new bot.Bot(auth_tokens[1], pr0bot.pr0bot_handler);
    var my_mailaddress_bot = new bot.Bot(auth_tokens[2], mailaddress_bot.mailaddress_handler);
});