export const required = value => (value ? undefined : 'This field is required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const maxValue = max => value =>
  value && value > max ? `Must be between 1 and ${max}` : undefined;

export const matches = field => (value, allValues) => 
        field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const zipCode = value => 
    value && !/^(0|[1-9][0-9]{4})$/i.test(value)
    ? 'Invalid zip code'
    : undefined;
