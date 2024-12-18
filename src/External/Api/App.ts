import express, { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import CookingAreaRoutes from './Routes/Routes'
import VerifyAuthToken from '../../UseCases/Auth/verifyAuthToken.usecase'
import { authMiddleware } from './Auth/AuthMiddleware'
import { RouteTypeEnum } from '../../Entities/Enums/RouteType'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const jwtSecret = process.env.JWT_SECRET || ''

const verifyAuthToken = new VerifyAuthToken(jwtSecret)

const cookingAreaRoutes = new CookingAreaRoutes()

// app.use('/api', authMiddleware(verifyAuthToken))

app.use(
    `/${RouteTypeEnum.PUBLIC}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: { url: `${process.env.SWAGGER_URL}` },
    })
)
app.use(getApiRoute('kitchen'), cookingAreaRoutes.buildRouter())

export default app
