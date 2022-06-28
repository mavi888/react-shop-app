import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART_USER,
	GET_CART_ITEMS_USER,
	REMOVE_CART_ITEM_USER,
	ON_SUCCESS_BUY_USER,
	IMAGE_UPLOAD,
	PRODUCT_UPLOAD,
	GET_PRODUCT_BY_ID,
	GET_HISTORY,
	GET_PRODUCTS,
} from '../_actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case REGISTER_USER:
			return {
				...state,
				register: action.payload,
			};

		case LOGIN_USER:
			return {
				...state,
				loginSucces: action.payload,
			};

		case AUTH_USER:
			return {
				...state,
				userData: action.payload,
			};

		case LOGOUT_USER:
			return {
				...state,
			};

		case ADD_TO_CART_USER:
			return {
				...state,
				userData: {
					...state.userData,
					cart: action.payload,
				},
			};

		case GET_CART_ITEMS_USER:
			return {
				...state,
				cartDetail: action.payload,
			};

		case REMOVE_CART_ITEM_USER:
			return {
				...state,
				cartDetail: action.payload.cartDetail,
				userData: {
					...state.userData,
					cart: action.payload.cart,
				},
			};

		case ON_SUCCESS_BUY_USER:
			return {
				...state,
				userData: {
					...state.userData,
					cart: action.payload.cart,
				},
				cartDetail: action.payload.cartDetail,
			};

		case PRODUCT_UPLOAD:
			return {
				...state,
			};

		case IMAGE_UPLOAD:
			return {
				...state,
				image: action.payload,
			};

		case GET_PRODUCT_BY_ID:
			return {
				...state,
				product: action.payload,
			};

		case GET_HISTORY:
			return {
				...state,
				history: action.payload,
			};

		case GET_PRODUCTS:
			return {
				...state,
				product: action.payload,
			};

		default:
			return state;
	}
}
