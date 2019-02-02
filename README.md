# setup

```sh
npm install
mkdir -p reports
```

## Before running the tests

Before you running any of the end-to-end tests, please note you have to launch the application first.

If you're running against mock server, you need to start it first

```sh
cd react-tdd-mock-server
npm install 
node server.js
```

And then the dev-server of the frontend application

```sh
cd bookish-react-code
yarn install
yarn start
```

## Running the tests

Once you have the application launched, it's time to run end-to-end tests:

```sh
npm test
```

You should see the tests all pass and some report generated inside `reports` folder.

