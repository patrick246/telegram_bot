var telegram = require('telegram-bot-api');

function Bot(auth_token, handler)
{
    this.auth_token = auth_token;
    this.api = new telegram({
        token: auth_token,
        updates: {
            enabled: true
        }
    });
    this.previousID = 0;
    this.api.getMe(function(err, data){
        if(err)
            return console.error(err);
        console.log(data);
    });
    var this_ = this;
    this.api.on('message', function (message) {
        handler(this_, message);
    })
}

exports.Bot = Bot;