# sst-ms-making

<img alt="Node Version" src="https://img.shields.io/badge/Node_Version-20.18-green"> [![Setup and build](https://github.com/fiap-soat-sst/sst-ms-making/actions/workflows/setup-build-pipeline.yml/badge.svg)](https://github.com/fiap-soat-sst/sst-ms-making/actions/workflows/setup-build-pipeline.yml) ![coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/evilfeeh/b08eb2c7df611955dd487f17d2a4c340/raw/coverage-sst-ms-making.json)

This application is part of the Tech Challenge project from FIAP.
This is a microsservice backend Developed with TypeScript, Docker, DDD and clean architecture focused to deliver functionalities to the cooking area manager theirs orders.

## ABOUT

We're introducing a Software that aims to optimize the self-service process in fast-food restaurants. Through an interactive totem, customers can place their orders quickly, conveniently, and autonomously, reducing queues and speeding up service.

Our **Event Storming** can be found here: https://miro.com/app/board/uXjVKVP2yDY=/

For more details about this project and the whole systen, access: https://github.com/fiap-soat-sst


## HOW TO SETUP:

Clone the project repository:

```bash
git clone https://github.com/fiap-soat-sst/sst-ms-making.git
```

Access the project directory:

```bash
cd sst-ms-making
```

Run the application with Docker Compose:

```bash
docker compose up
```

The apps runs into port 3125, it's possible to change the value port or other environments inside a .env file

To access the docs, access:
`http://localhost:3000/public/docs`

# Coverage - taken from the last pull request
![image](https://github.com/user-attachments/assets/e6f481aa-f382-4e3c-a9a4-23bdde58d39d)

