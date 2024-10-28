export interface BearerToken {
  clientId: number;
  clientSecret: string;
  grantType: string;
  scope: string;
  authUrl: string;
}
