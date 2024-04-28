import "../styles/globals.scss";
import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	let persistor = persistStore(store);
	useEffect(() => {
		AOS.init({
			easing: "ease-out-cubic",
			once: true,
			offset: 50,
		});
	}, []);
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SessionProvider session={session}>
					<Component {...pageProps} />{" "}
				</SessionProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
