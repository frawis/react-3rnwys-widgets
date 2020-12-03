import React, { useState, useEffect } from "react";
import "./style.css";

export default function App({ domElement }) {
  const coin = domElement.getAttribute("coin-id");
  const currency = domElement.getAttribute("currency");

  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from reddit
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    )
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setData(data.data.children.slice(0, 10));
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setError("error fetching from reddit");
      });
  }, [coin, currency]);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <p>{coin}</p>
      <p>{currency}</p>
    </div>
  );
}
