import {Router} from 'express'
import { search } from '../Controllers/SearchCn.js'
const searchRouter = Router()
searchRouter.get('/', search)
export default searchRouter