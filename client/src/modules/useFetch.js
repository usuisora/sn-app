import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url) {
	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		console.log(url);
		axios
			.get(url, { withCredentials: true })
			.then(function(response) {
				// handle success
				console.log(response);
				setData(response.data);
				setLoading(false);
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	}, []);

	return { data, loading };
}
