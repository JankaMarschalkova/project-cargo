import { ChangeEvent, useCallback, useState } from 'react';

const useField = (
	id: string,
	required?: boolean,
	defaultValue = ''
) => {
	let [value, setValue] = useState(defaultValue);
	let [touched, setTouched] = useState(false);

	const error = required && touched && !value;

	return {
		// Current value for convenient access
		value,
		// Props for the TextField
		props: {
			id,
			value,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => setTouched(true), []),
			required,
			error,
			helperText: error ? 'Required' : undefined
		}
	} as const;
};

export default useField;
