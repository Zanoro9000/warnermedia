import { ToastContainer } from 'react-toastify';
import '../layout/globalStyles.css';
import 'react-toastify/dist/ReactToastify.css';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<ToastContainer />
		</>
	);
}
