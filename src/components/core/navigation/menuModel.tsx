export type item = {
  label : string,
  isOpen : boolean,
  icon : string,
  items : listItems[],
}

interface listItems {
  label : string,
  name : string
}

const Menu : item[] = [
  {
    label : 'Manage Account' ,
    isOpen : false,
    icon : 'fa-solid fa-desktop',
    items : [
      {
        label : 'List Management',
        name : 'management'
      },
      {
        label : 'List User',
        name : 'user'
      }
    ],
  },
  {
    label : 'Manager Socmed',
    icon : 'fa-solid fa-user-gear',
    isOpen : false,
    items : [
      {
        label : 'Trending Hashtag',
        name : 'trendingHashtag'
      },
      {
        label : 'Manage Hashtag',
        name : 'hashtag'
      },
      {
        label : 'List Channel',
        name : 'channels'
      }
    ],
  },
  {
    label : 'Konten Feed',
    isOpen  : false,
    icon : 'fa-solid fa-pen',
    items : [
      {
        label : 'Post Feed',
        name : 'feed'
      },
      {
        label : 'Semua Postingan User',
        name : 'userPost'
      }
    ],
  },
]

export default Menu