import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

const useDateField = (
	id: string,
	defaultValue: dayjs.Dayjs,
	required?: boolean
) => {
	const [value, setValue] = useState<dayjs.Dayjs>(defaultValue ?? null);
	const [touched, setTouched] = useState(false);

	const error = required && touched && !value;

	return {
		// Current value for convenient access
		value,
		// Props for the DatePicker
		props: {
			id,
			value,
			onChange: useCallback(
				(e: dayjs.Dayjs | null) => {
					setValue(e ?? dayjs());
				},
				// eslint-disable-next-line react-hooks/exhaustive-deps
				[value]
			),
			onBlur: useCallback(() => setTouched(true), []),
			error,
			helperText: error ? 'Required' : undefined,
			slotProps: {
				textField: {
					required: required
				}
			}
		}
	};
};

export default useDateField;
