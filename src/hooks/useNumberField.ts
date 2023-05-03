import { ChangeEvent, useCallback, useState } from 'react';

const useNumberField = (id: string, defaultValue: number, required?: boolean) => {
	const [value, setValue] = useState<number>(defaultValue);
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
					setValue(parseFloat(e.target.value)),
				[]
			),
			onBlur: useCallback(() => setTouched(true), []),
			required,
			error,
			helperText: error ? 'Required' : undefined
		}
	} as const;
};

export default useNumberField;
