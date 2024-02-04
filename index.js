const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

const webhookId = '1203572814200709141';
const webhookToken = 'sKu4rpuAuE6nfPsxuFS-gfC1CDQy0Vmfa5KVILUd8AvsWHy_4SRdNZWAIog2s8uXtPjJ';

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - ZenithRPC has connected to Dsicord!`);

  const updatePresence = () => {
    const embed = new Discord.MessageEmbed()
      .setColor('#ff3c00')
      .setTitle('ZenithRPC | Updater')
      .setDescription('**SPARKY** are proud to announce their new client updating feature to check your uptime from your phone.')
      .addField('Discord Client:', client.user.tag, true)
      .addField('Client Uptime:', calculateUptime(), true)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter('・Developer: zensware   ', client.user.displayAvatarURL())
      .setTimestamp();

    const webhookClient = new Discord.WebhookClient({ id: webhookId, token: webhookToken });
    webhookClient.send({ embeds: [embed] })
      .then(() => {
        console.log('Embed sent successfully!');
      })
      .catch(console.error);
  };

  const calculateUptime = () => {
    const currentTime = Date.now();
    const uptime = currentTime - client.readyAt;
    const formattedUptime = formatMilliseconds(uptime);
    return formattedUptime;
  };

  const formatMilliseconds = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const r = new Discord.RichPresence()
    .setApplicationId('1203567972988362792')
    .setType('STREAMING') //Choosable options: STREAMING, PLAYING, LISTENING.
    .setURL('https://www.youtube.com/@ELITE-TRUCKER_OG'
    .setState('🔶 | ETL VTC CEO')
    .setName('EL!TE')
    .setDetails('🪐 | PLAY WITH US!')
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://cdn.discordapp.com/icons/1066109573544554647/a_f163b60f58c046aab1016f0c18ed565e.gif')
    .setAssetsLargeText(ELITE TRUCKERS LOGISTICS)
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1153277068797292567/1203638200451596288/1707040109579.gif')
    .setAssetsSmallText('ETS2 with Elite Truckers!')
    .addButton('TRUCKERSMP', 'https://truckersmp.com/vtc/60317')
    .addButton('TRUCKSBOOK', 'https://trucksbook.eu/company/167843')
    .addButton('ETL VTC 🧡', 'https://elitetruckerslogistics.com');
  
  const updatePresenceAndActivity = () => {
    updatePresence();
    client.user.setActivity(r);
  };
  updatePresenceAndActivity();
  setInterval(updatePresenceAndActivity, 30000);
  client.user.setPresence({ status: "dnd" });
});
client.login(process.env.TOKEN);
