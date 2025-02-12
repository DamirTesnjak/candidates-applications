/* eslint-disable @typescript-eslint/no-explicit-any */
export default function updateWholeObjectInState(state: any, payload: any) {
  return {
    ...state,
    ...payload,
  };
}
