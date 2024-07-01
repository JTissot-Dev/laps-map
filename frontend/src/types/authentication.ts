export type AuthenticatedUser = {
  userId: string,
  userName: string,
  email: string
};

export type AuthAction = { 
  type: 'login' | 'logout' | 'signup', 
  authenticatedUser: string
};
