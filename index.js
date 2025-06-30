import 'dotenv/config'
import linebot from 'linebot'
import commandMusic from './commands/music.js'
import commnadQr from './commands/qr.js'
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', (event) => {
  console.log('123')
  if (event.message.type === 'location') {
    commandMusic(event)
  } else if (event.message.text === '音樂') {
    commnadQr(event)
  }
})

bot.on('message', (event) => {
  if (event.message.type === 'text' && event.message.text === '離開') {
    handleLeave(event)
  }
  // ...其他判斷...
})

bot.on('postback', (event) => {
  if (event.postback.data === 'leave') {
    handleLeave(event)
  }
  // ...其他判斷...
})

// 離開的處理邏輯
function handleLeave(event) {
  event.reply('已離開，感謝您的使用(☞ﾟヮﾟ)☞')
}
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
