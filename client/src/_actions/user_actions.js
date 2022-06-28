import axios from 'axios';
import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART_USER,
	GET_CART_ITEMS_USER,
	REMOVE_CART_ITEM_USER,
	ON_SUCCESS_BUY_USER,
	PRODUCT_UPLOAD,
	IMAGE_UPLOAD,
	GET_PRODUCT_BY_ID,
	GET_HISTORY,
	GET_PRODUCTS,
} from './types';

import {
	USER_SERVER,
	STORE_SERVER,
	PRODUCT_SERVER,
} from '../components/Config.js';

export function registerUser(dataToSubmit) {
	const request = axios
		.post(`${USER_SERVER}/register`, dataToSubmit)
		.then((response) => response.data);

	return {
		type: REGISTER_USER,
		payload: request,
	};
}

export function loginUser(dataToSubmit) {
	const request = axios
		.post(`${USER_SERVER}/login`, dataToSubmit)
		.then((response) => response.data);

	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export function auth() {
	const request = axios
		.get(`${USER_SERVER}/auth`)
		.then((response) => response.data);

	return {
		type: AUTH_USER,
		payload: request,
	};
}

export function logoutUser() {
	const request = axios
		.get(`${USER_SERVER}/logout`)
		.then((response) => response.data);

	return {
		type: LOGOUT_USER,
		payload: request,
	};
}

export function addToCart(_id) {
	const request = axios
		.get(`${STORE_SERVER}/addToCart?productId=${_id}`)
		.then((response) => response.data);

	return {
		type: ADD_TO_CART_USER,
		payload: request,
	};
}

export function getCartItems(cartItems, userCart) {
	const request = axios
		.get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`)
		.then((response) => {
			//Make CartDetail inside Redux Store
			// We need to add quantity data to Product Information that come from Product Collection.

			userCart.forEach((cartItem) => {
				response.data.forEach((productDetail, i) => {
					if (cartItem.id === productDetail._id) {
						response.data[i].quantity = cartItem.quantity;
					}
				});
			});

			return response.data;
		});

	return {
		type: GET_CART_ITEMS_USER,
		payload: request,
	};
}

export function removeCartItem(id) {
	const request = axios
		.get(`${STORE_SERVER}/removeFromCart?_id=${id}`)
		.then((response) => {
			response.data.cart.forEach((item) => {
				response.data.cartDetail.forEach((k, i) => {
					if (item.id === k._id) {
						response.data.cartDetail[i].quantity = item.quantity;
					}
				});
			});
			return response.data;
		})
		.catch((e) => {
			alert('Error removing item from cart');
		});

	return {
		type: REMOVE_CART_ITEM_USER,
		payload: request,
	};
}

export function onSuccessBuy(data) {
	const request = axios
		.post(`${STORE_SERVER}/successBuy`, data)
		.then((response) => response.data);

	return {
		type: ON_SUCCESS_BUY_USER,
		payload: request,
	};
}

export function uploadImage(formData, config) {
	const request = axios
		.post(`${PRODUCT_SERVER}/uploadImage`, formData, config)
		.then((response) => {
			return response.data;
		});

	return {
		type: IMAGE_UPLOAD,
		payload: request,
	};
}

export function uploadProduct(productDetail) {
	const request = axios
		.post(`${PRODUCT_SERVER}/uploadProduct`, productDetail)
		.then((response) => {
			return response.data;
		});

	return {
		type: PRODUCT_UPLOAD,
		payload: request,
	};
}

export function getProductById(productId) {
	const request = axios
		.get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
		.then((response) => {
			return response;
		});

	return {
		type: GET_PRODUCT_BY_ID,
		payload: request,
	};
}

export function getHistory() {
	const request = axios.get(`${STORE_SERVER}/getHistory`).then((response) => {
		return response;
	});

	return {
		type: GET_HISTORY,
		payload: request,
	};
}

export function getProducts(variables) {
	const request = axios
		.post(`${PRODUCT_SERVER}/getProducts`, variables)
		.then((response) => {
			console.log(response);
			return response.data;
		});

	return {
		type: GET_PRODUCTS,
		payload: request,
	};
}
