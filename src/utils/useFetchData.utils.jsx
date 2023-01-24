import { useMsal } from '@azure/msal-react';

export const useFetchData = () => {
	const { instance } = useMsal();

	const fetchDataSub = async (subPath, request) => {
		const token = await instance.acquireTokenSilent(request);
		const res = await fetch(`${process.env.REACT_APP_PHONE_LIST_API}${subPath}`, {
			headers : { Authorization: `Bearer ${token.accessToken}` }
		});
		const json = await res.json();
		return json;
	};

	return fetchDataSub;
};
