export const initialLoginState = {
  userName: null,
  userToken: null,
  isLoading: true,
};
export const loginReducer = (preState, action) => {
  switch (action.type) {
    case 'RETRIVE_TOKEN':
      return {
        ...preState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...preState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGNOUT':
      return {
        ...preState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...preState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
  }
};
