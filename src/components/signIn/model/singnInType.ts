export type SignInError = {
  response?: {
    data?: {
      details?: any;
    };
  };
} & Error;
