import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [symbol,setSymbol]=useState('BTCUSDT')
  const coinList =[
    {
      symbol:"BTCUSDT",
    },
    {
      symbol:"ETHUSDT",
    },
    {
      symbol:"SOLUSDT",
    },
  ]
  console.log(symbol);

  return (
    <div className="App">
      <div className="container">
      <select className='selectCoin' name="symbol" id="" onClick={(e)=>setSymbol(e.target.value)} >
        {coinList.map((item,key)=>(
          <option value={item?.symbol}>{item?.symbol}</option>
        ))}
      </select>
      <ChartComponent
      symbol={symbol.toUpperCase()}
      />
      </div>
    </div>
  );
}

let tvScriptLoadingPromise;

function ChartComponent({symbol}) {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_dbed6') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: symbol?`BINANCE:${symbol}`:`BINANCE:BTCUSDT`,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_dbed6"
          });
        }
      }
    },
    [symbol]
  );

  return (
    <div className='tradingview-widget-container mb-4'>
      <div id='tradingview_dbed6' />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div>
    </div>
  );
}

export default App;
