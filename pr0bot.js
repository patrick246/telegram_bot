/**
 * Created by Patrick on 24.07.2015.
 */

var https = require('https');
var fs = require('fs');
var url = require('url');

function pr0bot_handler(bot, message)
{
    console.log("Message: ", message.text, "\nFrom: ", message.from.first_name, "\nIn: ",message.chat.title?message.chat.title:message.chat.first_name);
    if(!message.text)
        return;
    var command = message.text.split(' ');
    var type = 'beliebt';
    var flags = 1;
    switch (command[0])
    {
        case '/beliebt':
        case '/top':
        {
            type = 'beliebt';
        }
        break;
        case '/neu':
        case '/new':
        {
            type = 'neu'
        }
        break;
        case '/nsfw':
        {
            flags = 2;
        }
        break;
        case '/nsfl':
        {
            flags = 4;
        }
        break;
        default:
            return;
    }

    bot.api.sendChatAction({
        chat_id: message.chat.id,
        action: 'typing'
    }, function (err) {
        if(err) {
		console.log(err);
		return;
	}
	command.splice(0,1);
        getImages(type, command.join(" "), flags, function (data) {
            var num = Math.random() * data.items.length;
            var picture = data.items[Math.floor(Math.random() * data.items.length)];
            var filename = picture.image.substr(picture.image.lastIndexOf('/')+1);

            download_picture('https://img.pr0gramm.com/' + picture.image, function (stream)
            {
                var ext = filename.substr(filename.lastIndexOf('.'))
                if(ext == '.webm' || ext == '.gif')
                {
                    bot.api.sendDocumentStream({
                        chat_id: message.chat.id,
                        document: stream
                    }, function (error, data) {
                        if (error)
                            return console.log(error);

                        bot.api.sendMessage({
                            chat_id: message.chat.id,
                            text: "👍"+ picture.up + " 👎"+ picture.down
                        });
                    });
                }
                else
                {
                    bot.api.sendPhotoStream({
                        chat_id: message.chat.id,
                        photo: stream,
                        caption: "👍"+ picture.up + " 👎"+ picture.down
                    }, function (error, data) {
                        if (error)
                            console.log(error);
                    });
                }
            });
        });
    });
}

function getImages(category, tag, flag, finishedHandler)
{
    var my_path = '/api/items/get?';
    if(category == 'beliebt')
        my_path += 'promoted=1&';
    if(tag)
        my_path += 'tags=' + encodeURIComponent(tag) + '&';
    if(flag)
        my_path += 'flags=' + encodeURIComponent(flag);


    var options = {
        hostname: 'pr0gramm.com',
        path: my_path,
        port: 443,
        method: 'GET'
    };

    var req = https.request(options, function (res) {
        var data = '';
        res.on('data', function (d) {
            data += d;
        });
        res.on('end', function () {
            var json_data = JSON.parse(data);
            if(!json_data.error)
            {
                finishedHandler(json_data);
            }
            else
            {
                console.warn(json_data.error);
            }
        });
    }).end();
}

function download_picture(url, cb)
{
    var req = https.get(url, function(response){
        cb(response);
    })
}

exports.pr0bot_handler = pr0bot_handler;
