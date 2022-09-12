import { AuthActionCreators } from "./auth/action-creators"
import { ItemActionCreators } from "./item/action-creators"

export const allActionCreators = {
    ...ItemActionCreators,
    ...AuthActionCreators
}