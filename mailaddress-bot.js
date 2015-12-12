/**
 * Created by Patrick on 07.09.2015.
 */

var mails = require(__dirname + "/mailaddresses.json");
var auth_code = require(__dirname + "/mailaddresses-auth.json").code;

function mailaddress_handler(bot, message)
{
    console.log(message);
    if(!message.text) return;
    if((message.chat.title && message.chat.title.indexOf(auth_code) > -1) || (message.chat.username && message.chat.username == "patrick246"))
    {
        console.log("Authenticated");
        var commands = message.text.split(' ');
        console.log(commands.length);
        if (commands.length === 0) {
            return;
        }
        if (commands[0] !== '/mails') {
            return;
        }
        if (commands.length < 2) {
            bot.api.sendMessage({
                chat_id: message.chat.id,
                text: "Benutzung:\n/mails show -- Zeigt alle Mailaddressen\n/mails show [name] -- Zeigt die Mail für [name] an\n" /*"/mails add [email] [name] -- Fügt eine Email hinzu\n/mails remove [name] -- Entfernt die Mail für [name]"*/
            }, function (err) {
                console.log(err);
            });
            return;
        }
        switch (commands[1]) {
            case 'show':
                show_adresses(bot, message);
                break;
            case 'add':

        }
    }
}

function show_adresses(bot, message)
{
    var commands = message.text.split(' ');
    var filter_flag = commands.length >= 3;
    var name = "";
    if(filter_flag)
    {
        name = commands.slice(2).join(' ');
    }
    console.log(mails);
    var mailtext = "";
    for(var i = 0; i < mails.length; ++i)
    {
        if((filter_flag && mails[i].name.indexOf(name) > -1) || !filter_flag)
            mailtext += mails[i].name + ': ' + mails[i].email + "\n";
    }
    bot.api.sendMessage({
        chat_id: message.chat.id,
        text: mailtext
    }, function (err) {
        console.log(err);
    });
}

function add_adress(bot, message)
{

}

function remove_adress(bot, message)
{

}

exports.mailaddress_handler = mailaddress_handler;