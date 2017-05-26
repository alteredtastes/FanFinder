# NapRanks
Sample full stack app written with React, Express, Node, and Mongo. Demonstrates consumption of the Napster API with 3-Legged OAuth, authenticated API calls, isomorphic fetch, ES7's await and async functions, and JSON web tokens.  

## Setup and requirements
- MongoDB  
    - Instructions for install [here](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
- Node 7.9.0  
    - This app requires Node 7.9 or later due to ES7 async functions and await. To swap Node versions, I use [NVM](https://github.com/creationix/nvm).  
`nvm install 7.9.0`  
`nvm use 7.9.0`  
- Napster Credentials:  
    - Register as a developer at [developer.napster.com](http://developer.napster.com)
    - Add a new app on your Napster Developer account. "Callback URL" should be: `http://localhost:3001/api/oauth/callback`.
    - Create a `.env` file in the project's root directory, i.e. `/NapRanks/.env`
    - Copy/paste credentials from your Napster developer app page as follows into the `.env` file.
      ```
         NAPSTER_KEY=YOUR APP'S API KEY FROM DEVELOPER.NAPSTER.COM   
         NAPSTER_SECRET=YOUR APP'S SECRET FROM DEVELOPER.NAPSTER.COM
         NAPSTER_CALLBACK=http://localhost:3001/api/oauth/callback
         ```
- Your NapRank App's Credentials:
    - Add strings for the jwt and cookie secrets and then include the lines in the same `.env` file.  
        ```
        JWT_SECRET=ANY STRING OF CHARACTERS CAN GO HERE  
        COOKIE_SECRET=ANY STRING OF CHARACTERS CAN GO HERE  
        DEV_CLIENT=http://localhost:3000
