require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const GAME_URL = 'https://voucher.scratchnft.site/';
const CONTRACT = '0xa4d064E4ac881234961C076d314Abf9ac8d4E4BB';
const LOGO = 'https://scarlet-central-krill-672.mypinata.cloud/ipfs/bafybeiaho7h7ysvoxmoqvi7rveh2rcls6rh4weagezoi6umctfpgrgkvp4';

const VOUCHERS = [
  { value: '5€',   price: '100 MON',   img: 'https://files.catbox.moe/mszp1d.jpeg' },
  { value: '10€',  price: '200 MON',   img: 'https://files.catbox.moe/otcljk.jpeg' },
  { value: '20€',  price: '300 MON',   img: 'https://files.catbox.moe/c11h9p.jpeg' },
  { value: '50€',  price: '500 MON',   img: 'https://files.catbox.moe/4jezdg.jpeg' },
  { value: '100€', price: '1,000 MON', img: 'https://files.catbox.moe/qlf6vq.jpeg' },
  { value: '500€', price: '5,000 MON', img: 'https://files.catbox.moe/ir84ab.jpeg' },
];

bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name || 'User';
  bot.sendPhoto(msg.chat.id, LOGO, {
    caption:
      `💶 *EURO VOUCHER NFT SYSTEM*\n\n` +
      `Welcome, ${name}! 🎉\n\n` +
      `Buy Euro-denominated NFT vouchers on Monad Mainnet!\n\n` +
      `▸ 5€ → 100 MON\n` +
      `▸ 10€ → 200 MON\n` +
      `▸ 20€ → 300 MON\n` +
      `▸ 50€ → 500 MON\n` +
      `▸ 100€ → 1,000 MON\n` +
      `▸ 500€ → 5,000 MON\n\n` +
      `⛓ Chain: Monad #143`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '💶 Buy Voucher Now', web_app: { url: GAME_URL } }],
        [{ text: '💰 Prices', callback_data: 'prices' },
         { text: '📋 Contract', callback_data: 'contract' }],
        [{ text: '❓ Help', callback_data: 'help' }]
      ]
    }
  });
});

bot.onText(/\/buy/, (msg) => {
  bot.sendPhoto(msg.chat.id, 'https://files.catbox.moe/qlf6vq.jpeg', {
    caption: '💶 *Buy Euro Voucher NFT*\n\nOpen the app and connect your wallet to purchase!',
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: [[{ text: '💶 Open Voucher App', web_app: { url: GAME_URL } }]] }
  });
});

bot.onText(/\/prices/, (msg) => {
  let txt = '💰 *VOUCHER PRICES*\n\n';
  VOUCHERS.forEach(v => { txt += `💶 ${v.value} → *${v.price}*\n`; });
  txt += `\n⛓ Network: Monad Mainnet #143`;
  bot.sendPhoto(msg.chat.id, 'https://files.catbox.moe/ir84ab.jpeg', {
    caption: txt,
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: [[{ text: '💶 Buy Now', web_app: { url: GAME_URL } }]] }
  });
});

bot.onText(/\/contract/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `📜 *Smart Contract Info*\n\n` +
    `▸ Address:\n\`${CONTRACT}\`\n\n` +
    `▸ Network: Monad Mainnet\n` +
    `▸ Chain ID: 143\n` +
    `▸ Standard: ERC-721\n` +
    `▸ Symbol: EVNFT\n\n` +
    `🔍 [View on Explorer](https://explorer.monad.xyz/address/${CONTRACT})`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `❓ *EURO VOUCHER HELP*\n\n` +
    `💶 /buy — Buy a voucher NFT\n` +
    `💰 /prices — View all prices\n` +
    `📜 /contract — Contract info\n\n` +
    `🌐 App: ${GAME_URL}\n` +
    `⛓ Chain: Monad #143`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  if (query.data === 'prices') {
    let txt = '💰 *VOUCHER PRICES*\n\n';
    VOUCHERS.forEach(v => { txt += `💶 ${v.value} → *${v.price}*\n`; });
    bot.sendPhoto(chatId, 'https://files.catbox.moe/ir84ab.jpeg', {
      caption: txt,
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[{ text: '💶 Buy Now', web_app: { url: GAME_URL } }]] }
    });
  }
  if (query.data === 'contract') {
    bot.sendMessage(chatId,
      `📜 *Contract:*\n\`${CONTRACT}\`\n\n` +
      `⛓ Monad Mainnet #143\n\n` +
      `🔍 [View on Explorer](https://explorer.monad.xyz/address/${CONTRACT})`,
      { parse_mode: 'Markdown' }
    );
  }
  if (query.data === 'help') {
    bot.sendMessage(chatId,
      `❓ *Help*\n\n💶 /buy\n💰 /prices\n📜 /contract`,
      { parse_mode: 'Markdown' }
    );
  }
  bot.answerCallbackQuery(query.id);
});

console.log('💶 Euro Voucher Bot is running...');
