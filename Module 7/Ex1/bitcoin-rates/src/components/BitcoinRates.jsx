import { useState } from "react";
import { useBitcoinRate } from "../hooks/useBitcoinRate";
import { useMood } from "../context/MoodContext";

const currencies = ["USD", "AUD", "NZD", "GBP", "EUR", "SGD"];

function BitcoinRates() {
  const [currency, setCurrency] = useState(currencies[0]);
  const { rate, loading, error } = useBitcoinRate(currency);

  // 👇 get the shared emoji from context
  const { emoji } = useMood();

  const options = currencies.map((curr) => (
    <option value={curr} key={curr}>
      {curr}
    </option>
  ));

  return (
    <div className="BitcoinRates componentBox">
      {/* show emoji here */}
      <h3>
        Bitcoin Exchange Rate {emoji}
      </h3>

      <label>
        Choose currency:{" "}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {options}
        </select>
      </label>

      <div style={{ marginTop: "1rem" }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {rate !== null && !loading && !error && (
          <p>
            1 BTC = <strong>{rate}</strong> {currency}
          </p>
        )}
      </div>
    </div>
  );
}

export default BitcoinRates;
