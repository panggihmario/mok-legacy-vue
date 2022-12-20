import pathPost from './post.js'
import pathNews from "./news.js"
import pathUser from "./user.js"
import socmedRoute from "./managerSocmed"

const allpath = [
  ...pathPost,
  ...pathNews,
  ...pathUser,
  ...socmedRoute
]

export default allpath