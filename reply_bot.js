/**
 * Created by Patrick on 24.07.2015.
 */

var reply_handler = function (bot, message) {
    bot.api.sendMessage({
        chat_id: message.message.chat.id,
        text: message.message.text,
        reply_to_message_id: message.message.message_id
    }, function(err, data){
        if(err)
            console.warn(err);
    });
};

exports.reply_handler = reply_handler;