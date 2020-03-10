import React, { useCallback, createContext, useMemo, useState } from "react";
import _ from "../../lodash";
import useRefState from "../../useRefState";

const render = ({ children, ctx, onFormSubmit }) => (
  <FormContext.Provider value={ctx}>
    <form onSubmit={onFormSubmit}>
      {typeof children === "function" ? children(ctx) : children}
    </form>
  </FormContext.Provider>
);

const Form = ({ children, onSubmit, validation, initialValues }) => {
  /** STATE */
  initialValues = useMemo(() => {
    return initialValues || {};
  }, [initialValues]);

  const [values, setValues, valuesRef] = useRefState(initialValues);
  const [errors, setErrors, errorsRef] = useRefState({});
  const [touchedFields, setTouchedFields, touchedFieldsRef] = useRefState({});
  const [isSubmitting, setIsSubmitting, isSubmittingRef] = useRefState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasClientValidation = typeof validation === "function";

  /** METHODS */
  const getValue = useCallback(
    path => {
      return _.get(valuesRef.current, path, "");
    },
    [valuesRef]
  );

  const setValue = useCallback(
    (path, value) => {
      setValues(oldValues => {
        const newValues = { ...oldValues };
        _.set(newValues, path, value);
        return newValues;
      });
    },
    [setValues]
  );

  const getError = useCallback(
    path => {
      return _.get(errorsRef.current, path, "");
    },
    [errorsRef]
  );

  const removeError = useCallback(
    path => {
      const newErrors = { ...errorsRef.current };

      _.unset(newErrors, path);
      setErrors(newErrors);
    },
    [errorsRef, setErrors]
  );

  const isTouchedField = useCallback(
    path => {
      if (hasSubmitted) return true;
      return !!_.get(touchedFieldsRef.current, path, false);
    },
    [hasSubmitted, touchedFieldsRef]
  );

  const setTouched = useCallback(
    path => {
      setTouchedFields(oldTouched => {
        const newTouched = { ...oldTouched, [path]: true };
        // _.set(newTouched, path, true);
        return newTouched;
      });
    },
    [setTouchedFields]
  );

  const validate = useCallback(() => {
    let errors = {};

    if (hasClientValidation) {
      errors = validation(valuesRef.current, errorsRef.current);
      setErrors(errors);
    }
    return errors;
  }, [errorsRef, valuesRef, validation, setErrors, hasClientValidation]);

  const finishSubmitting = useCallback(() => {
    setIsSubmitting(false);
  }, [setIsSubmitting]);

  /** HANDLERS */
  const onFormSubmit = useCallback(
    ev => {
      ev.preventDefault();
      const errors = validate();
      setHasSubmitted(true);

      if (Object.keys(errors).length === 0) {
        setIsSubmitting(true);
        onSubmit(valuesRef.current, { setErrors, finishSubmitting });
      }
    },
    [
      setIsSubmitting,
      setHasSubmitted,
      validate,
      setErrors,
      valuesRef,
      finishSubmitting,
      onSubmit,
    ]
  );

  /** EFFECTS */

  /** CONTEXT VALUE */
  const ctx = useMemo(
    () => ({
      initialValues,
      values: values,
      getValue,
      setValue,
      errors,
      getError,
      removeError,
      setErrors,
      isTouchedField,
      setTouched,
      hasClientValidation,
      validate,
      isSubmitting,
      finishSubmitting,
    }),
    [
      initialValues,
      values,
      getValue,
      setValue,
      errors,
      getError,
      removeError,
      setErrors,
      isTouchedField,
      setTouched,
      hasClientValidation,
      validate,
      isSubmitting,
      finishSubmitting,
    ]
  );
  return render({ children, ctx, onFormSubmit });
};

export const FormContext = createContext({
  initialValues: {},
  values: {},
  getValue: () => {},
  setValue: () => {},
  errors: {},
  getErrors: () => {},
  removeError: () => {},
  setErrors: () => {},
  isTouchedField: () => {},
  setTouched: () => {},
  hasClientValidation: false,
  validate: () => {},
  isSubmitting: false,
  finishSubmitting: () => {},
});

export default Form;
