import React, { useContext, useCallback, useMemo, useEffect } from "react";
import _ from "../../lodash";
import { FormContext } from "./Form";

const FieldRender = ({
  InputAs,
  name,
  label,
  error,
  inputProps,
  isTouched,
  ...rest
}) => {
  console.log("rendering field");
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <InputAs {...inputProps} {...rest} />
      {error && isTouched && <p>{error}</p>}
    </div>
  );
};

const Field = ({ FieldAs, InputAs, name, label, ...rest }) => {
  /** STATE */

  const {
    setValue,
    getValue,
    initialValues,
    validate,
    getError,
    removeError,
    isTouchedField,
    setTouched,
    hasClientValidation,
  } = useContext(FormContext);

  const value = getValue(name);
  const error = getError(name);
  const isTouched = isTouchedField(name);

  label = label || name;
  FieldAs = FieldAs || FieldRender;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  rest = useMemo(() => rest, [JSON.stringify(rest)]);

  /** METHODS */

  /** HANDLERS */
  const onChange = useCallback(
    evOrValue => {
      let value = evOrValue;
      if (evOrValue && evOrValue.target) {
        const target = evOrValue.target;
        value = target.type === "checkbox" ? target.checked : target.value;
      }

      setValue(name, value);
      if (!hasClientValidation) {
        removeError(name);
      }
    },
    [name, removeError, setValue, hasClientValidation]
  );

  const onBlur = useCallback(() => {
    setTouched(name);
    validate();
  }, [setTouched, name, validate]);

  /** EFFECTS */
  useEffect(() => {
    setValue(name, _.get(initialValues, name, ""));
  }, [name, setValue, initialValues]);

  /** FIELD PROPS */

  const inputProps = useMemo(
    () => ({
      id: name,
      name,
      value,
      onChange,
      onBlur,
    }),
    [name, value, onChange, onBlur]
  );

  return useMemo(
    () =>
      FieldAs({ InputAs, name, label, error, isTouched, inputProps, ...rest }),
    [FieldAs, InputAs, name, label, error, isTouched, inputProps, rest]
  );
};

export default Field;
