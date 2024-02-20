# Northcoders News API


1. Create two environment files called .env.test and .env.development 
2. Set PGDATABASE = nc_news inside .env.development file
3. Set PGDATABASE = nc_news_test inside .env.test file

----------------
4. Completed task 2 - GET api-topics
5. Completed task 3 - GET -api. I have written code for two ways of doing this.
    1 -> Requiring endpoints.json and just returning that object.
    2 -> By using fs.readFile and returning the parsed objects. This was my first way of doing it and have commented it out. Both of these passed my tests. Just wondering if both are ok or if the first one is still the best one. I like the first one better as the code is less. Please give me feedback on this. I will delete the commented/unnecessary code once after the feedback is given. Thank you.