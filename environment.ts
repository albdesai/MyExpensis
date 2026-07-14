// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
  appInsightsKey: '',
  auth: {
    clientId: '',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:4200'
  }
};
