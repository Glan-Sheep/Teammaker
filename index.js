const Discord = require('discord.js');

const config = require("./config");
require("dotenv").config();

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES
  ]
  });

client.once('ready', () => {
	console.log(`Ready`)
});

client.on('messageCreate', async message => {
	// Turns the bot on

	if (message.author.bot) return;
	// The bot will ignore messages from other bots

	if (!message.content.startsWith(config.prefix)) return;
	// Ignores messages that don't start with the prefix

	if (message.content.startsWith(`${config.prefix}maketeam `)) {
    let index = message.content.replace(`${config.prefix}maketeam `, '')
    let team = index.split(" ");
    arrayShuffle(team);

    const TeamA = team.slice(0, team.length / 2);
    const TeamB = team.slice(team.length / 2, team.length);

    let TeamA_str = "";
    let TeamB_str = "";

    for (let i = 0; i < TeamA.length; i++) {
      TeamA_str += ` ${TeamA[i]}`;
    }
    for (let i = 0; i < TeamB.length; i++) {
      TeamB_str += ` ${TeamB[i]}`;
    }
    const embeds = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("MakeTeam!")
      .setDescription(`
      🌀 **Team 🅰**${TeamA_str}
      🌀 **Team 🅱**${TeamB_str}
      `);
    message.channel.send({ embeds: [embeds] });
	}
});

function arrayShuffle(array) {
  for(var i = (array.length - 1); 0 < i; i--){
    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));
    // 要素の並び替えを実行
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

client.login(process.env.TOKEN);