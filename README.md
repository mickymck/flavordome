# FlavorDome

## Description

With FlavorDome as your guide, you and your friends can enjoy the ultimate taste-test experience. Use FlavorDome to conduct an objective taste test—chips, root beer, veggie burgers, anything you want—and turn any old hangout into a unique social event.

## User Flow

- Walk the Taste Test Host through setup
- Give instructions on how to mask challengers from all users, host included
- Randomize tasting order, while ensuring all users are tasting the same challenger at the same time
- Store all user scores for all challengers, resulting in a top-4
- Generate random head-to-head matchups from the top-4, and store all user scores for the matchups
- Generate championship matchup based on results of head-to-head matchups
- Declare and dramatically present the winner, as well as 2nd, 3rd, and last place finishers

## New Technologies

- Vue and Vuex - we learned to use Vue and Vuex as a front end library to handle our state management—primarily responsible for randomizing challengers, storing scores, and determining winners
- Web sockets with Django Channels - making sure the taste test does not advance until all users are in the same state together, and scores have been collected
- AWS - we stored our background image, logo, and demo video in an Amazon S3 bucket for quick, universal use
- Adobe CS6 - our wireframe, background, and logo were all created using Adobe Illustrator, and our demo video was created using Adobe After Effects

## Deployment

FlavorDome has been deployed to Heroku, and can be found online at:

https://flavordome.herokuapp.com/

to run locally, go into `frontend` then `npm run watch` and then in another terminal tab, `npm run serve` and remember to change the store from `wss` (which is used for Heroku) to `ws` (necessary for a local server) and to make the necessary changes to the django `settings` under channel layers (commented for clarity)
