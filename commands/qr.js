export default async (event) => {
  await event.reply({
    type: 'text',
    text: '在這裡( •̀ ω •́ )✧',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'uri',
            // 按下去後，使用者傳送出的文字
            uri: 'https://drive.google.com/file/d/1HVtKPuq9p4PRXyqckbT7nj-yMq2SANof/view?usp=sharing',
            text: 'usd',
            // 按鈕文字
            label: '致愛麗絲',
          },
        },
        {
          type: 'action',
          action: {
            type: 'uri',
            uri: 'https://ed.arte.gov.tw/ch/index.aspx',
            // 按鈕文字
            label: '台灣藝術教育網',
          },
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '離開',
            data: 'leave',
            displayText: '離開',
          },
        },
      ],
    },
  })
}
