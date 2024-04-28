import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("cartItems")
	? JSON.parse(Cookies.get("cartItems") || "")
	: [];
const cartSlice = createSlice({
	name: "cartData",
	// initialState: initialState,
	initialState: [],

	reducers: {
		addToCart: (state, action) => {
			const itemExists = state.find((item) => item._id === action.payload._id);
			if (itemExists) {
				console.log("itemExi", itemExists);
				itemExists.quantity++;
			} else {
				state.push({ ...action.payload, quantity: 1 });
			}
		},
		incrementQuantity: (state, action) => {
			const itemExists = state.find((item) => item._id === action.payload._id);
			itemExists.quantity++;
			const lState = state.filter((item) => item._id !== action.payload._id);
			console.log("lol");
			// Cookies.set(
			// 	"cartItems",
			// 	JSON.stringify([
			// 		...lState,
			// 		{ ...itemExists, quantity: itemExists.quantity++ },
			// 	])
			// );
		},
		fixedQuantity: (state, action) => {
			const itemExists = state.find((item) => item._id === action.payload._id);

			itemExists.quantity = action.payload.quantity;
		},
		decrementQuantity: (state, action) => {
			const itemExists = state.find((item) => item._id === action.payload._id);
			if (itemExists.quantity === 1) {
				const index = state.findIndex(
					(item) => item._id === action.payload._id
				);
				// Cookies.set("cartItems", JSON.stringify(state.splice(index, 1)));
				state.splice(index, 1);
				console.log("Lol");
			} else {
				const lState = state.filter((item) => item._id !== action.payload._id);
				// Cookies.set(
				// 	"cartItems",
				// 	JSON.stringify([
				// 		...lState,
				// 		{ ...itemExists, quantity: itemExists.quantity-- },
				// 	])
				// );
				itemExists.quantity--;
			}
		},
		removeFromCart: (state, action) => {
			const index = state.findIndex((item) => item._id === action.payload._id);
			state.splice(index, 1);
		},
		orderCompleted: () => initialState,
	},
});

export const cartReducer = cartSlice.reducer;

export const {
	addToCart,
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	fixedQuantity,
	orderCompleted,
} = cartSlice.actions;
