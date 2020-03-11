import { useState, useRef } from "react";

export default function useStateRef(initialValue) {
  const [state, setState] = useState(initialValue);

  const stateRef = useRef();
  stateRef.current = state;

  return [state, stateRef, setState];
}
