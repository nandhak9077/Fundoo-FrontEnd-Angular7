// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/",
  // baseUrl:"http://18.225.6.16:3000/",



  firebase: {




    apiKey: "AIzaSyCadwsAoZa3U7RNlemV_t8UEjrcQkOBSm0",
    authDomain: "keep-14b7d.firebaseapp.com",
    databaseURL: "https://keep-14b7d.firebaseio.com",
    projectId: "keep-14b7d",
    storageBucket: "keep-14b7d.appspot.com",
    messagingSenderId: "226083562030"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
