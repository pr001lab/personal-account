export enum APIRoute {
  Login = '/login',
  Users = '/users',
  Contacts = '/contacts',
}

export enum AppRoute {
  Login = '/login',
  Contacts = '/',
}

export enum StatusLoading {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ParamNames {
  SearchFullText = 'q',
}
