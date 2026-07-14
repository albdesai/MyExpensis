export const environment = {
  production: true,
  apiUrl: 'https://api.myexpensis.azure.com/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
  appInsightsKey: 'your-app-insights-key',
  auth: {
    clientId: 'your-azure-ad-client-id',
    authority: 'https://login.microsoftonline.com/your-tenant-id',
    redirectUri: 'https://myexpensis-app.azurewebsites.net'
  }
};
