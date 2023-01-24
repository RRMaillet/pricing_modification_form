import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../store/user/user.actions';

async function useAuthToken(request) {
	const { instance } = useMsal();
	const dispatch = useDispatch();
	try {
		const newToken = await instance.acquireTokenSilent(request);
		if (newToken) {
			dispatch(setAuthToken(newToken.accessToken));
			return newToken.accessToken;
		}
	} catch (error) {
		console.log(error);
	}
}

export default useAuthToken;
