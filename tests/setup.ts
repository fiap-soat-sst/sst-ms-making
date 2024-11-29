import { beforeAll } from 'vitest'

import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql'

const SIXTY_SECONDS = 60 * 1000

let container: MySqlContainer = new MySqlContainer()
let startedContainer: StartedMySqlContainer

beforeAll(async () => {
    console.log('///////////////////////////////////////////////////')
    startedContainer = await container.start()
    console.log('///////////////////////////////////////////////////')
    console.log(startedContainer.getConnectionUri())

    return async () => {
        await startedContainer.stop()
    }
}, SIXTY_SECONDS)
