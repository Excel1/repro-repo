import { defineBoot } from '#q-app/wrappers'
import { initAuth } from '@badisi/auth-vue';

export default defineBoot(async ({ app, router }) => {

  const AuthPlugin = await initAuth({
    authorityUrl: import.meta.env.VITE_AUTHORITY_URL,
    clientId: import.meta.env.VITE_CLIENT_ID,
    scope: 'openid profile email offline_access',
    internal: {
      //silent_redirect_uri: 'http://192.168.188.20:9000/oidc/callback/silent_redirect.html'
      /*extraQueryParams: {
        audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/' // required by Auth0 to get access_token in JWT format
      }*/
    },
    mobileScheme: 'demo-app',
    loginRequired: false,
    // authGuardFallbackUrl: 'unauthorized', // global settings that can also be set on each route using the authGuard
    // automaticLoginOn401: false,
    automaticInjectToken: true,
    // automaticInjectToken: {
    //     include: ['/api', /\*.api/g],
    //     exclude: (url: string): boolean => !url.includes('api')
    // }
  });
  app.use(AuthPlugin, { router });

})
