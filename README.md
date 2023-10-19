# RS Technologies - TODO APP

# Chapters

## [I. Introduction](#introduction)

## [II. Initial setup](#initial-setup)

## [III. Project structure](#project-structure)

## [IV. Code documentation](#code-documentation)

## [V. Git](#git)

# Introduction

This is a MEVN project.
Backend : NodeJS : Express
Frontend: ReactJS
Database: MongoDB

This documentation is for the **TODO APP** which handles the users' authentication and manager todo list.It will provide details on the setup required to start this server in the [Initial setup chapter](#initial-setup), how are the folders organized in the [Project structure chapter](#project-structure), how to document this code in [Code documentation](#code-documentation), and finally how to manage this project's version using git in the [Git chapter](#git).

# Initial setup

In order to start using this project, you need to have these tools installed in your environment:

- [Node JS](https://nodejs.org/en) : Make sure to have an LTS (Long Term Support) version installed, to avoid any possible breaking changes caused by upgrades. You can check if you have Node JS installed in your environment by running:

```properties
# Command to run
node -v
# Command output if nodeJS is installed:
v16.10.0
```

- Setup the [.env](.env) file with the `JWT_SECRET`,`HTTP_PORT`,`MONGODB_URI` and `JWT_EXPIRATION` variables.

# Running the project

- Clone this project

```properties
git clone git@gitlab.com:swisspremiumnegoce/backend-kubernetes-authentication.git
```

- Make sure your local repository is up to date with the remote changes

```properties
git pull
```

- Make sure you have installed the project's dependencies

```properties
# If you're running with npm
npm install
# If you're running with yarn
yarn
```

- For the frontend dependencies :

```properties
# If you're running with npm
npm run install-client
# If you're running with yarn
yarn install-client
```

- To seed data in the database after add .env file with variables, run this commands to test the application.
  This action is not necessary, you can test without generate fake data.
- When you seed a model, all the existing instances will be deleted before seed.

```properties
# If you are using npm
npm run seed:users
npm run seed:todos
# If you are using yarn
yarn seed:users
yarn seed:todos
```

- To run only the Express server in `development mode` this project run this command

```properties
# If you are using npm
npm run server
# If you are using yarn
yarn server
```

- To run only the Frontend in `development mode` this project run this command

```properties
# If you are using npm
npm run client
# If you are using yarn
yarn client
```

- To run both in `development mode` this project run this command

```properties
# If you are using npm
npm run dev
# If you are using yarn
yarn dev
```

- There are multiple scripts in this project, you can see them in [package.json](package.json).

```properties
# Used to run tests
yarn dev
# Start the backend and the frontend in production mode
yarn start
# check if the code is correctly formatted
yarn format:check
# Formats the code
yarn format:write
# Starts the linter to verify if the code is compliant with the linter's rules
yarn lint:check
# Fixes any lint related issues
yarn lint:fix
```

# Project Structure

This project is devided to different folders and files.

- [client](#client)
- [node_modules](#node_modules)
- [src](#src)
  - [controllers](#controllers)
  - [libs](#libs)
    - [common](#common)
      - [models](#models)
      - [routes](#routes)
      - [validations](#validations)
      - [seeds](#seeds)
  - [middlewares](#middlewares)
  - [routes](#routes)
  - [services](#services)
- [Root files](#root-files)

## client

This folder contain our frontend application build with react.

## node_modules

This folder is auto generated when running the command:

```properties
# If using npm
npm install
# If using yarn
yarn
```

All the installed dependencies will be saved in this folder, which will be ignored by git since its size can increase really quickly.

## src

Mainly contains express server features.

## controllers

Contains the controllers used for each model

## libs

Contains all the necessary services for the application to function like models, route configuration and model validations.

### models

Contains all the models used in this application.

### routes

Contains all the routes used in this application.

### validations

Contains all the validation functions needed for this application.

### seeds

Contains all the scripts to seed fake data for test.

## middlewares

Contains all the middlewares to secure routes.

## routes

Routes are the addresses that the user will access, each route will contact a specific function in the controllers depending on the request method, if the permissions requirements are met.

## services

Contains generic classes that are created to simply and reduce the quantity of code used in the controllers.

## Root files

Different files are found in the project's root, each one of these files have their own usage in this project.

- [.env](.env): Contains the local environment variables that are used by the server (Ex: API keys, Secrets, ...),
- [.eslintrc.json](.eslintrc.json): The syntax rules used by eslint that are applied in this project.
- [.gitignore](.gitignore): Files to be ignored by git when commiting to version control.
- [app.js](app.js): The application's entry point, this file is the first one to be compiled and executed when running the server.
- [package.json](package.json): This file contains different informations on this project such as : Description, external packages, scripts to run the server correctly, ...
- [README.md](README.md) : The project's documentation.
- [RS_Technologies_todo_app.postman_collection.json](RS Technologies todo app.postman_collection) : This is a postman file to check and test api easily.

# Code documentation

Each controller will contain a description header, this header will indicate the endpoint, a small description of what the function will do,the request method, and the role required to access this API.

The code will also include comments describing what are the actions performed by each block of code, in order to make large blocks of code understandable and easier to debug.

# Git

This project is available on [GitHub](https://gitlab.com/swisspremiumnegoce/backend-kubernetes-authentication), and will be updated as frequently as possible.

# Steps to follow before committing

Committing a change to git is the final step to do once a feature is developed and ready to be shipped, but before proceeding to this action, you need to follow these steps first:

- Check if your code is clean by running

```properties
yarn lint:check
```

- If the command returns no errors, you can proceed and commit your work.
