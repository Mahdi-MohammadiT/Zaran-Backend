import {Router} from 'express'
import { search } from '../Controllers/SearchCn'
const searchRouter = Router()
searchRouter.get('/', search)
export default searchRouter