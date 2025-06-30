export default () => ({
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://www.publicdomainpictures.net/pictures/550000/nahled/image-1700030424I0G.jpg',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      uri: 'https://line.me/',
    },
  },
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'md',
    contents: [
      {
        type: 'text',
        text: "BROWN'S ADVENTURE\nIN MOVIE",
        wrap: true,
        weight: 'bold',
        gravity: 'center',
        size: 'xl',
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '時間',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: 'Monday 25, 9:00PM',
                wrap: true,
                size: 'sm',
                color: '#666666',
                flex: 4,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '地址',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: '555454',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 4,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '地點',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: '0800092000',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 4,
              },
            ],
          },
        ],
      },
    ],
  },
})
