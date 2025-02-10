import { IAppSelectorState } from '@/lib/hooks';
import { WritableDraft } from 'immer';


export default function updateWholeObjectInState(
  state: any,
  payload: any,
) {
  return {
    ...state,
    ...payload,
  };
}