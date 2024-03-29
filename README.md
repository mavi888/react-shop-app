# MY REACT SHOP - A MERN Example

## Summary of the demo

In this demo you will see:

- How to build a React web application to simulate an eCommerce
- How to build a NodeJS backend application to simulate an eCommerce
- Adding Open Telemetry traces

## Requirements

- NodeJS 16.x installed
- A container running a Mongo instance. Check [this tutorial](https://luturol.github.io/docker/mongodb/Using-MongoDB-with-Docker) for more.

## Run this demo locally

1. Make `dev.js` file inside `config` folder
2. Add mongoDB info into dev.js file.

```
module.exports = {
    mongoURI:'mongodb://user:password@localhost:27017'
}
```

3. Type `npm install` inside the root directory, to download server-side dependencies.

4. Type `npm install` inside the client directory, to download front-end dependencies.

5. Create an `upload` folder in the root of this project
6. If you want to prepopulate the eCommerce you can copy all the files in `data/images` to the `upload` folder.
7. Use mongo restore to restore the database dump in the `data/dump` folder.

```
mongorestore --uri="mongodb://<user>:<password>@localhost:27017" dump/
```

8. Run in the terminal

```
npm run dev
```

### How to develop this project

The React part of this code repo is inspired in a YouTube tutorial.
You can watch [the tutorial](https://www.youtube.com/watch?v=zaWtIkJgah4&t=5569s) to learn to build this application.

## Migrate to serverless

This code repository is part of a series of videos. In this series you will learn how to migrate this MERN application to Serverless on AWS. You can follow the whole series in this [playlist](https://www.youtube.com/playlist?list=PLGyRwGktEFqe2ga9UmQSBr5xdfVyiDPW6)
