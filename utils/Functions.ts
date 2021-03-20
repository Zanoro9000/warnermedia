import Axios from 'axios';

//helper function for some default settings for toast as well as catching the different types of error messages
export function toastError(toast, err) {
	if (!Axios.isCancel(err))
		toast?.error(
			'Error: ' + err
				? err?.response
					? err.response.data
						? err.response.data.message ?? err.response.data.Message ?? err.message ?? err.response.data
						: err?.response?.message ?? 'Undefined Error'
					: err?.message ?? err.toString() ?? 'Undefined Error'
				: 'Undefined Error',
			{
				position: 'bottom-left',
				autoClose: 10000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			}
		);
}
