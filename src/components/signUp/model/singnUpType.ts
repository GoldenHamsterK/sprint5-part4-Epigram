export type SignUpError = {
  response?: {
    data?: {
      details?: any;
    };
  };
} & Error;
