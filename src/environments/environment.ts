// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const ENV = 'development';
// const HOST = 'localhost';
// const PORT = 3000;
// // if env is 'inmemory', the inmemory debug resource is used
// const FABRIC8_FORGE_API_URL = 'https://forge.api.openshift.io';
// const FABRIC8_WIT_API_URL = 'https://prod-preview.openshift.io/api/';
// const FABRIC8_FEATURE_TOGGLES_API_URL = FABRIC8_WIT_API_URL;
// const FABRIC8_AUTH_API_URL = 'https://auth.prod-preview.openshift.io/api/';
// const FABRIC8_REALM = 'fabric8';
// const FABRIC8_SSO_API_URL = 'https://sso.prod-preview.openshift.io/';
// const FABRIC8_RECOMMENDER_API_URL = 'https://api-bayesian.dev.rdu2c.fabric8.io/api/v1/';
// const FABRIC8_FORGE_URL = FABRIC8_FORGE_API_URL;
// const FABRIC8_PIPELINES_NAMESPACE = "";
// const FABRIC8_JENKINS_API_URL = "https://jenkins.api.prod-preview.openshift.io";
// const PUBLIC_PATH =  '/';
// const BUILD_NUMBER = "";
// const BUILD_TIMESTAMP = "";
// const BUILD_VERSION = "";
// const FABRIC8_BRANDING =  'fabric8';
// const ANALYTICS_RECOMMENDER_URL = "";
// const ANALYTICS_LICENSE_URL = "";

export const environment = {
  production: false,
  ENV: 'development',
  HOST: 'localhost',
  PORT: 3000,
// if env is 'inmemory', the inmemory debug resource is used
  FABRIC8_FORGE_API_URL: 'https://forge.api.openshift.io',
  FABRIC8_WIT_API_URL: 'https://prod-preview.openshift.io/api/',
  FABRIC8_FEATURE_TOGGLES_API_URL: 'https://prod-preview.openshift.io/api/',
  FABRIC8_AUTH_API_URL: 'https://auth.prod-preview.openshift.io/api/',
  FABRIC8_REALM: 'fabric8',
  FABRIC8_SSO_API_URL: 'https://sso.prod-preview.openshift.io/',
  FABRIC8_RECOMMENDER_API_URL: 'https://api-bayesian.dev.rdu2c.fabric8.io/api/v1/',
  FABRIC8_FORGE_URL: 'https://forge.api.openshift.io',
  FABRIC8_PIPELINES_NAMESPACE: "",
  FABRIC8_JENKINS_API_URL: "https://jenkins.api.prod-preview.openshift.io",
  PUBLIC_PATH: '/',
  // BUILD_NUMBER = "";
  // BUILD_TIMESTAMP = "";
  // BUILD_VERSION = "";
  // FABRIC8_BRANDING =  'fabric8';
  ANALYTICS_RECOMMENDER_URL: "",
  ANALYTICS_LICENSE_URL: ""
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
