import fs from 'fs'
import path from 'path'
import axios from 'axios'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// 檔案路徑處理
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const downloadDir = path.join(__dirname, 'images')
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir)

// 下載圖片函式
async function downloadImage(url) {
  const fileName = path.basename(new URL(url).pathname)
  const filePath = path.join(downloadDir, fileName)
  try {
    const response = await axios.get(url, { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
    console.log(`✅ 下載完成: ${fileName}`)
  } catch (e) {
    console.error(`❌ 圖片下載失敗: ${url}`, e.message)
  }
}

// 開始主流程
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()

const apiUrl =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1'
const { data } = await axios.get(apiUrl)

for (const item of data) {
  const url = item.webSales
  if (!url?.startsWith('http')) continue

  try {
    console.log(`🔍 處理活動頁面: ${url}`)
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })

    // 抓第一張圖片的 src（可根據 class 自訂）
    const imgUrl = await page.evaluate(() => {
      const img = document.querySelector('img.program-logo')
      if (img && img.src) {
        return img.src
      }
      return null
    })

    if (imgUrl) {
      await downloadImage(imgUrl)
    } else {
      console.warn(`⚠️ 沒找到圖片: ${url}`)
    }
  } catch (err) {
    console.error(`❌ 頁面錯誤: ${url}`, err.message)
  }
}

await browser.close()
