// fetchAndScrape.js
document.addEventListener('DOMContentLoaded', async () => {
  const apiURL =
    'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1'
  const container = document.getElementById('imageContainer')
  if (!container) return console.error('請加入 <div id="imageContainer"></div>')

  try {
    const res = await fetch(apiURL)
    if (!res.ok) throw new Error(`API 失敗：${res.status}`)
    const arr = await res.json()

    for (const item of arr) {
      const pageUrl = item.sourceWebPromote
      if (!pageUrl) continue

      try {
        const pageRes = await fetch(pageUrl)
        if (!pageRes.ok) throw new Error(`抓網頁失敗：${pageUrl}`)
        const html = await pageRes.text()
        const doc = new DOMParser().parseFromString(html, 'text/html')

        // 改成你要的 selector，例如 img.featured、#main-pic
        const sel = 'img.featured'
        const imgTag = doc.querySelector(sel)
        if (!imgTag || !imgTag.src) {
          console.warn(`沒有找到 ${sel} 在 ${pageUrl}`)
          continue
        }

        // 若 src 為相對路徑，轉成絕對 URL
        const src = new URL(imgTag.getAttribute('src'), pageUrl).href
        const img = document.createElement('img')
        img.src = src
        img.alt = item.title || ''
        img.style.maxWidth = '200px'
        img.style.margin = '10px'
        container.appendChild(img)
      } catch (e) {
        console.error(`處理網頁 ${pageUrl} 錯誤`, e)
      }
    }
  } catch (e) {
    console.error('API 讀取錯誤', e)
  }
})
