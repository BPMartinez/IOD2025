import { useEffect, useReducer } from "react";

const initialState = {
  rate: null,
  loading: false,
  error: null,
};

function rateReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { rate: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { rate: null, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Custom hook to fetch Bitcoin rate for a given currency
export function useBitcoinRate(currency) {
  const [state, dispatch] = useReducer(rateReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRate() {
      try {
        dispatch({ type: "FETCH_START" });

        const code = currency.toLowerCase();
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${code}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Failed to fetch rate");
        }

        const data = await res.json();
        const value = data.bitcoin?.[code];

        dispatch({ type: "FETCH_SUCCESS", payload: value });
      } catch (err) {
        if (err.name === "AbortError") return; // clean abort
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    }

    fetchRate();

    return () => {
      controller.abort();
    };
  }, [currency]);

  return state; // { rate, loading, error }
}
