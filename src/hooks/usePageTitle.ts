import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | CarGo`;
	}, [title]);
};

export default usePageTitle;
