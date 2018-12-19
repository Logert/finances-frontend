export const defaultAsyncActions = () => ({
  REQUEST: payload => payload,
  SUCCESS: payload => payload,
  FAIL: payload => payload,
  LOADING: payload => payload || false,
});
