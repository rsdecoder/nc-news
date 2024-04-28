# NC News API

This is a rest API built using PostgreSQL which provides the data for the frontend NC News app.

#### Tech Stack:

- PostgreSQL 
- node.js
- Express.js - framework
- Jest - test framework
- supertest

#### How to set up the repo locally
Create two environment files called <code>.env.test</code> and <code>.env.development</code>
>1. Set <code>PGDATABASE = nc_news</code> inside .env.development file
> 2. Set <code>PGDATABASE = nc_news_test</code> inside .env.test file

#### Install
You would need to run the following command to install all the necessary packages to run the app successfully.

><code>npm install</code>

#### How to run the app locally
First, set up the DBS
><code>npm run setup-dbs</code>

Then, start seeding the database with the data by running this command
><code>npm run seed</code>


The minimum version of the node required to run this project -
  ><code>Node.js v21.2.0</code>

The minimum version of Postgres required to run this project
  ><code>psql (14.10 (Homebrew), server 16.1)</code>

* Link to the hosted version - https://nc-news-1-ukr6.onrender.com/api


