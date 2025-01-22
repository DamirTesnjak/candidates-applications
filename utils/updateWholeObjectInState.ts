export default function updateWholeObjectInState(state, payload) {
    return {
        ...state,
        ...payload,
    }
}