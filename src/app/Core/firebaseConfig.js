const configs = {
  development: {
    apiKey: "AIzaSyC-hpDFbNqL1GV-am2L6lrJH1a8nj8oRro",
    authDomain: "flatmatebills-development.firebaseapp.com",
    databaseURL: "https://flatmatebills-development.firebaseio.com",
    projectId: "flatmatebills-development",
    storageBucket: "flatmatebills-development.appspot.com",
    messagingSenderId: "935617475526"
  },
  production: {
    apiKey: "AIzaSyCBC7D-589zHcKxZu7GeAie2QeD15aPO7c",
    authDomain: "flatmatebills.firebaseapp.com",
    databaseURL: "https://flatmatebills.firebaseio.com",
    projectId: "flatmatebills",
    storageBucket: "flatmatebills.appspot.com",
    messagingSenderId: "408329859921"
  }
}

export default (environment = 'development') => configs[environment]