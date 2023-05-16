import { ChangeEvent, useCallback, useState } from 'react';

const useField = <T extends number | string>(
	id: string,
	defaultValue: T,
	required?: boolean
) => {
	const [value, setValue] = useState(defaultValue);
	const [touched, setTouched] = useState(false);

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
					setValue(
						(typeof defaultValue === 'number'
							? parseFloat(e.target.value)
							: e.target.value) as T
					),
				[defaultValue]
			),
			onBlur: useCallback(() => setTouched(true), []),
			required,
			error,
			helperText: error ? 'Required' : undefined
		}
	} as const;
};

export default useField;
