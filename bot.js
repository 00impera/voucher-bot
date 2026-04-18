require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// Keep Render happy with a simple HTTP server
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => res.end('Bot is running')).listen(PORT, () => {
  console.log(`HTTP server on port ${PORT}`);
});

const token = process.env.BOT_TOKEN;
const WEBSITE = 'https://nftcriptotokens.pages.dev';
const CONTRACT = 'update_with_real_contract';

const bot = new TelegramBot(token, { polling: true });

console.log('💶 Euro Voucher Bot is running...');
const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🚀 BUY NOW — Get Euro Voucher NFT!', web_app: { url: WEBSITE } }],
      [{ text: '🎁 FREE AIRDROP — Claim Now!', url: WEBSITE }],
      [{ text: '🎫 View Vouchers', callback_data: 'vouchers' }, { text: '💶 How It Works', callback_data: 'howto' }],
      [{ text: '📜 Contract', callback_data: 'contract' }, { text: '❓ Help', callback_data: 'help' }],
      [{ text: '🌐 Open dApp', url: WEBSITE }],
    ]
  },
  parse_mode: 'Markdown'
};

const WELCOME_BANNER =
  '🟡🟠🔴🟣🔵🟢🟡🟠🔴🟣🔵🟢\n' +
  '💶 *EURO CASH NFT VOUCHER SYSTEM* 💶\n' +
  '🟢🔵🟣🔴🟠🟡🟢🔵🟣🔴🟠🟡\n\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━\n' +
  '🔥 *AIRDROP IS LIVE — CLAIM NOW!* 🔥\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
  '💵 *€5* · 💴 *€10* · 💶 *€20* · 💷 *€50*\n' +
  '💰 *€100* · 💎 *€200* · ⭐ *€500* VOUCHERS\n\n' +
  '✅ _Decentralized Euro vouchers on Monad_\n' +
  '🔐 Fully on-chain · Secure · Instant\n' +
  '⚡ Monad Blockchain Speed\n' +
  '🎁 *FREE NFT AIRDROP* for early holders!\n\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━\n' +
  '👇 *TAP BUY NOW TO GET YOURS!* 👇\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━';

bot.onText(/\/start/, (msg) => bot.sendMessage(msg.chat.id, WELCOME_BANNER, mainMenu));
bot.onText(/\/vouchers/, (msg) => sendVouchers(msg.chat.id));
bot.onText(/\/howto/, (msg) => sendHowTo(msg.chat.id));
bot.onText(/\/contract/, (msg) => sendContract(msg.chat.id));
bot.onText(/\/airdrop/, (msg) => sendAirdrop(msg.chat.id));
bot.onText(/\/website/, (msg) => {
  bot.sendMessage(msg.chat.id, `🌐 Euro Voucher dApp:\n${WEBSITE}`, {
    reply_markup: { inline_keyboard: [[{ text: '🚀 Open dApp NOW', url: WEBSITE }]] }
  });
});
bot.onText(/\/help/, (msg) => sendHelp(msg.chat.id));

function sendVouchers(chatId) {
  bot.sendMessage(chatId,
    '🎫 *EURO VOUCHER NFT COLLECTION* 🎫\n\n' +
    '🟢 *€5* · 🔵 *€10* · 🟡 *€20* · 🟠 *€50*\n' +
    '🔴 *€100* · 💜 *€200* · ⭐ *€500*\n\n' +
    '🎁 *AIRDROP* — Free NFT for early buyers!',
    { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [
      [{ text: '🚀 BUY NOW!', url: WEBSITE }],
      [{ text: '🔙 Back', callback_data: 'menu' }]
    ]}}
  );
}

function sendAirdrop(chatId) {
  bot.sendMessage(chatId,
    '⚡ *FREE NFT AIRDROP — LIVE NOW!* ⚡\n\n' +
    '*Step 1* 👉 Connect your wallet\n' +
    '*Step 2* 👉 Buy any Euro Voucher NFT\n' +
    '*Step 3* 👉 FREE NFT airdropped to you!\n\n' +
    '⏰ *LIMITED TIME OFFER — ACT NOW!*',
    { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [
      [{ text: '🎁 CLAIM FREE AIRDROP NOW!', url: WEBSITE }],
      [{ text: '🔙 Back', callback_data: 'menu' }]
    ]}}
  );
}

function sendHowTo(chatId) {
  bot.sendMessage(chatId,
    '💶 *HOW EURO VOUCHER NFT WORKS* 💶\n\n' +
    '*Step 1* ✅ Connect your wallet\n' +
    '*Step 2* ✅ Choose denomination\n' +
    '*Step 3* ✅ Purchase the NFT voucher\n' +
    '*Step 4* ✅ Receive FREE AIRDROP NFT 🎁\n' +
    '*Step 5* ✅ Redeem anytime on-chain',
    { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [
      [{ text: '🚀 BUY NOW!', url: WEBSITE }],
      [{ text: '🔙 Back', callback_data: 'menu' }]
    ]}}
  );
}

function sendContract(chatId) {
  bot.sendMessage(chatId,
    `📜 *SMART CONTRACT INFO* 📜\n\n🎫 *Euro Voucher NFT ERC-721*\n\`${CONTRACT}\`\n\n⛓ Network: Monad Blockchain`,
    { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [
      [{ text: '🚀 BUY NOW!', url: WEBSITE }],
      [{ text: '🔙 Back', callback_data: 'menu' }]
    ]}}
  );
}

function sendHelp(chatId) {
  bot.sendMessage(chatId,
    '❓ *Commands*\n\n/start\n/vouchers\n/airdrop\n/howto\n/contract\n/website\n/help',
    { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [
      [{ text: '🚀 BUY NOW!', url: WEBSITE }]
    ]}}
  );
}

bot.on('callback_query', (q) => {
  bot.answerCallbackQuery(q.id);
  const chatId = q.message.chat.id;
  if (q.data === 'menu') bot.sendMessage(chatId, WELCOME_BANNER, mainMenu);
  else if (q.data === 'vouchers') sendVouchers(chatId);
  else if (q.data === 'howto') sendHowTo(chatId);
  else if (q.data === 'contract') sendContract(chatId);
  else if (q.data === 'airdrop') sendAirdrop(chatId);
  else if (q.data === 'help') sendHelp(chatId);
});

bot.on('polling_error', (err) => console.error('Polling error:', err.message));
