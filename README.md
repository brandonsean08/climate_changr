## Climate Changr
An application to view the change in average monthly temperatures from the past to the future for various countries.

# About
Climate Changr is an application that will allow the user to view the monthly temperature changes from the Past to the Future based on 'Actual' and 'Predicted' data provided.

It provides two main 'View Type's':

1) Country
    - Actual vs Predicted
        - This shows the actual and predicted averages by month for a chosen country.
    - Change
        - This shows the difference between the predicted and the actual monthly data for all of the countries, sorted from
        biggest to smallest.

2) Month
    - TO-DO

# Tech Stack:

The Backend consists of a Node.js server using the Express framework.

The frontend consists of a React application using Redux for state management.

In a larger production build I would use a bundler like webpack to bundle the static assets but for the case of this app it was not necessary.

# Setup

1) Ensure that you have Node installed on your computer.
2) Clone the repository.
3) Open your terminal and run 'cd climate_changr/climate_changr_frontend'
4) In the same terminal window, run 'npm install'
5) Once the node_modules have eben installed, run 'cd ../climate_changr_backend && npm install'
6) In the same terminal window run 'npm run start-dev'. This will start the client and server at the same time.

View the hosted site here:https://climate-changr.herokuapp.com/
