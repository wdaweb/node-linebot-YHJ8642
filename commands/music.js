import axios from 'axios'
// import path from 'path'
// import puppeteer from 'puppeteer'
// import cheerio from 'cheerio'
import { distance } from '../utils/distance.js'
import template from '../templates/music.js'
import fs from 'fs'
// import { url } from 'inspector'
export default async (event) => {
  try {
    const { data } = await axios.get(
      'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1',
    )
    const bubbles = data
      .map((value) => {
        value.distance = distance(
          value.showInfo[0].latitude,
          value.showInfo[0].longitude,
          event.message.latitude,
          event.message.longitude,
          'K',
        )
        return value
      })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 3)
      .map((value) => {
        const address = value.showInfo[0].location
        // const url =
        //   value.webSales || `https://www.google.com/maps/place/${encodeURIComponent(address)}`
        const bubble = template()
        // bubble.hero.url =
        // console.log(value.webSales)
        bubble.hero.action.uri = value.webSales
        bubble.body.contents[0].text = value.title
        console.log(value.title)
        bubble.body.contents[1].contents[0].contents[1].text = value.showInfo[0].time
        console.log(value.showInfo[0].time)
        bubble.body.contents[1].contents[1].contents[1].text = value.showInfo[0].locationName
        console.log(address)
        bubble.body.contents[1].contents[2].contents[1].text = address
        console.log(value.showInfo[0].locationName)
        // bubble.body.contents[2].contents[0].action.uri = value.webSales
        // console.log(value.webSales)
        return bubble
      })
    const result = await event.reply({
      type: 'flex',
      altText: '音樂表演資訊',
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })
    console.log(result)
    if (process.env.DEV === 'true') {
      fs.writeFileSync(
        './dump/music.json',
        JSON.stringify(
          {
            type: 'carousel',
            contents: bubbles,
          },
          null,
          2,
        ),
      )
    }
  } catch (error) {
    console.error(error)
    await event.reply('發生錯誤')
  }
}
