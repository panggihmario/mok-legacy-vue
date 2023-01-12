import pathPost from './post.js'
import pathNews from "./news.js"
import pathUser from "./user.js"
import socmedRoute from "./managerSocmed"
import pathMaster from "./master"

const allpath = [
  ...pathPost,
  ...pathNews,
  ...pathUser,
  ...socmedRoute,
  ...pathMaster
]

export default allpath