import 'reflect-metadata'
import { afterAll, beforeAll } from 'vitest'
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql'
import dotenv from 'dotenv'
dotenv.config({
    path: '.env.test',
})

const SIXTY_SECONDS = 60 * 1000

let container: MySqlContainer = new MySqlContainer('mysql:5.7')
let startedContainer: StartedMySqlContainer

beforeAll(async () => {
    startedContainer = await container
        .withName('mysql_test')
        .withRootPassword('root123')
        .withExposedPorts({ container: 3306, host: 3306 })
        .withDatabase('test')
        .withUsername('user')
        .withUserPassword('user123')
        .withHealthCheck({
            test: [
                'CMD',
                'mysqladmin ping -h localhost -u user --password=user123',
            ],
            timeout: SIXTY_SECONDS,
            interval: 5,
            retries: 5,
        })
        .start()
}, SIXTY_SECONDS)

afterAll(async () => {
    await startedContainer.stop()
})
