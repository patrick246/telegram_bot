var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', function(line) {
	if(line == "" || line[0] !== "{")
		return;
	try
	{
		var json = JSON.parse(line);
		var name = json.from.first_name + ((json.from.last_name)?" "+json.from.last_name:"") + ((json.from.username)?"@"+json.from.username:""); 
		var chat = ((json.chat.first_name)?"Privat":json.chat.title)+json.chat.id;
		var text = (json.text)?json.text:"No Content";
		process.stdout.write(json.message_id + "\t" + name + "\t" + chat + "\t" + text + "\n");
	}
	catch(err)
	{
		process.stdout.write("Error parsing log entry: " + err + "\n");
	}
});
