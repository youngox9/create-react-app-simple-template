import { useState } from "react";
import _ from "lodash";
import formRules from "./rules";

const useForm = (props) => {
  const { form = {} } = props;

  const [isTouched, setTouched] = useState(false);
  const rules = formRules(form) || {};

  const errors = Object.keys(form).reduce((prev, k) => {
    const ruleArr = rules[k] || [];
    const value = _.get(form, k);

    const errorText = ruleArr.reduce((p, rule) => {
      if (!p) {
        const text = rule(value);

        return text;
      }
      return p;
    }, "");

    return {
      ...prev,
      [k]: errorText,
    };
  }, {});

  const isValid = Object.keys(errors || {}).every((k) => {
    const val = errors?.[k];
    return !val;
  });
  return { errors, isValid, isTouched, setTouched } || {};
};

export default useForm;
