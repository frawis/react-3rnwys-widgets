import React, { useState, useEffect } from "react";
import "./style.css";

function renderCoin(coin) {
  return (
    <div className="br_coin_widget__coin" key={coin.market_cap_rank}>
      <div className="">
        <div>
          <img src={coin.image} alt={coin.name} width="32" />
        </div>

        <h3>{coin.name}</h3>
      </div>

      <div>
        {coin.current_price}
        <span>{coin.market_cap_change_percentage_24h}</span>
      </div>
      <div>
        <table>
          <tr>
            <th>Rank</th>
            <td># {coin.market_cap_rank}</td>
          </tr>
          <tr>
            <th>Marktkapitalisierung</th>
            <td>{coin.market_cap}</td>
          </tr>
          <tr>
            <th>Marktkapitalisierung</th>
            <td>{coin.market_cap}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default function App({ domElement }) {
  const coin = domElement.getAttribute("coin-id");
  const currency = domElement.getAttribute("currency");
  const backgroundColor = domElement.getAttribute("background-color");
  const widthWidget = domElement.getAttribute("width");

  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from reddit
    setLoading(true);
    fetch(
      `
      https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin}&order=market_cap_desc&per_page=1&page=1&sparkline=false`
    )
      .then(response => response.json())
      .then(data1 => {
        console.log(data1[0]);
        setLoading(false);
        setData(data1[0]);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setError("error fetching from coingecko");
      });
  }, [coin, currency]);

  return (
    <div
      className={"br_coin_widget__app"}
      style={{ backgroundColor, width: widthWidget }}
    >
      <div className="br_coin_widget__inner">
        {loading && "Lade..."}
        {error && error}
        {data && renderCoin(data)}
        <div className="br_coin_widget__powered_by">
          powered by <a href="#">BR</a>
        </div>
      </div>
    </div>
  );
}
