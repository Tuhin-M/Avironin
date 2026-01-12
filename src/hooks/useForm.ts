import { useState, ChangeEvent, FormEvent } from 'react';

interface FormState {
    [key: string]: any;
}

export const useForm = <T extends FormState>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));

        // Clear error when user changes value
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const setFieldValue = (name: keyof T, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (
        e: FormEvent,
        onSubmit: (values: T) => Promise<void>
    ) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(values);
        } catch (error: any) {
            console.error("Form submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        values,
        errors,
        isLoading,
        handleChange,
        setFieldValue,
        handleSubmit,
        setValues,
        setErrors
    };
};
