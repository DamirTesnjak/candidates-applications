This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installation

Clone this repository
> git clone https://github.com/DamirTesnjak/candidates-applications


To run as nodejs server you must have installed Node on your computer.

- Install **[MongoDB](https://www.mongodb.com/products/self-managed/community-edition)** or **[Compass](https://www.mongodb.com/products/tools/compass)**.
- Run in terminal

  > npm install

  to install necessary libraries

- In `.ENV` file change `MONGO_URL` to a new value if you have an custom one, default value should work

- Then run

  > npm run dev

  to run the application in development mode

- Visit the app at http://localhost:3000

### Running with the docker container

- Install any docker hosting provider, such as **[Docker](https://www.docker.com/)**

- Run in terminal

  > docker-compose up

- Use

  > docker-compose up --build

  when you made changes in original source code

- Installation will create a new docker image of a build app as in production environment,
  and will pull Mongo image for the app's database

- When both images are running, visit the app at http://localhost:4000
