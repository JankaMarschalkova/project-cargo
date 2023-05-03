import { ChangeEvent, useCallback, useState } from 'react';

const useDateField = (id: string, defaultValue: Date, required?: boolean) => {
	const [value, setValue] = useState<Date | null>(defaultValue);
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
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
					const timestamp = Date.parse(e.target.value);
					const dateValue = isNaN(timestamp) ? null : new Date(timestamp);
					setValue(dateValue);
				},
				[]
			),
			onBlur: useCallback(() => setTouched(true), []),
			required,
			error,
			helperText: error ? 'Required' : undefined
		}
	} as const;
};

export default useDateField;
