import { Client, Guild, StreamDispatcher, VoiceChannel, VoiceConnection } from "discord.js";
import { config } from "dotenv";
config();

const GUILD_ID = process.env.GUILD_ID ? process.env.GUILD_ID : "";
const CHANNEL_ID = process.env.CHANNEL_ID ? process.env.CHANNEL_ID : "";

const client = new Client();

let stopper:StreamDispatcher | undefined = undefined;
let connection:VoiceConnection | null = null;
let penis:boolean = false;

client.login();

client.on('ready', async () => {
    const {guild,channel} = await getDetails();

    await (channel as VoiceChannel).join();
});

client.on('voiceStateUpdate',async (oldState, newState) => {
    const {guild,channel} = await getDetails();

    const members = channel.members.size;

    if (members == 1) stopPenis();

    if (newState.connection) connection = newState.connection;
    if (members >= 2 && !penis) startPenis();
})

async function getDetails(): Promise<{guild:Guild,channel:VoiceChannel}> {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = guild.channels.resolve(CHANNEL_ID);
    if (!channel) throw ("Couldn't find channel");

    return {guild: guild,channel: (channel as VoiceChannel)}
}

function startPenis() {
    penis = true;
    stopper = connection?.play("./penis.mp3").on("finish", () => startPenis());
}

function stopPenis() {
    penis = false;
    stopper?.pause();
}

import { createServer } from "http";
const server = createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);