import React, { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  validation?: (value: string) => string | null;
}

interface AnimatedFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({ fields, onSubmit }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: FormField, value: string) => {
    setValues(prev => ({ ...prev, [field.name]: value }));
    
    if (field.validation) {
      const error = field.validation(value);
      setErrors(prev => ({ ...prev, [field.name]: error || '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(values);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name} className="form-field">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium mb-1"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`
              w-full px-4 py-2 rounded border
              transition-all duration-300
              ${errors[field.name] ? 'form-field-invalid' : ''}
              ${!errors[field.name] && values[field.name] ? 'form-field-valid' : ''}
            `}
            disabled={isSubmitting}
          />
          {errors[field.name] && (
            <div className="form-feedback visible text-error">
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className={`
          button-ripple
          ${isSubmitting ? 'button-loading' : ''}
          w-full py-2 px-4 rounded
          bg-primary text-white
          transition-all duration-300
          hover:bg-primary-dark
          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {isSuccess && (
        <div className="flex items-center justify-center mt-4">
          <div className="success-checkmark" />
          <span className="ml-2 text-success">Successfully submitted!</span>
        </div>
      )}
    </form>
  );
};

export default AnimatedForm;