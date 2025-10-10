import express from 'express'
import {fileURLToPath} from 'url'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { catchError, HandleERROR } from 'vanta-api'
import swaggerUi from 'swagger-ui-express'
import exportValidation from './Middlewares/ExportValidation.js'
import uploadRouter from './Routes/Upload.js'
import IsAdmin from './Middlewares/IsAdmin.js'
import authRouter from './Routes/Auth.js'
import swaggerDocs from './Utils/Swagger.js'
import userRouter from './Routes/User.js'
import rateLimit from 'express-rate-limit'
import sliderRouter from './Routes/Slider.js'
import brandRouter from './Routes/Brand.js'
import categoryRouter from './Routes/Category.js'
import variantRouter from './Routes/Variant.js'
import addressRouter from './Routes/Address.js'
import IsLogin from './Middlewares/IsLogin.js'
import productRouter from './Routes/Product.js'
import productVariantRouter from './Routes/ProductVariant.js'
import commentRouter from './Routes/Comment.js'
import cartRouter from './Routes/Cart.js'
import discountCodeRouter from './Routes/DiscountCode.js'
import searchRouter from './Routes/Search.js'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100 ,
    message: "Too many requests from this IP, please try again later."
})
const app = express()
app.use(cors())
app.use(limiter)
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/Public`))
app.use(exportValidation)
app.use('/api/auth', authRouter)
app.use('/api/upload', IsAdmin,uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/sliders', sliderRouter)
app.use('/api/brands', brandRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/variants', variantRouter)
app.use('/api/products', productRouter)
app.use('/api/product-variants', productVariantRouter)
app.use('/api/comments', commentRouter)
app.use('/api/search', searchRouter)
app.use('/api/discount-code', discountCodeRouter)
app.use('/api/carts',IsLogin, cartRouter)
app.use('/api/addresses', IsLogin, addressRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use((req,res,next)=>{
    next(new HandleERROR('Not Found', 404))
})

app.use(catchError)

export default app

