### User login
- email: test@gmail.com
- password: Password123

### globally install Angular CLI
- npm install -g @angular/cli

### Set up Angular project
- ng new --no-standalone aslzone

### Add environments folder manually with CLI
- ng g environments

### npm packages
- bootstrap@4.0.0-beta.2
- font-awesome
- jquery
- popper.js
- firebase
- angularfire2 -> now it's: @angular/fire
- @fontsource/lora

### Hosting
- had to use sudo on Mac for firebase setup commands
- make sure to drag and drop files from within the "browser" folder inside of the dist folder from "ng build" into the base level of the dist or public folder (decide what to call the folder with static files when setting up firebase hosting)