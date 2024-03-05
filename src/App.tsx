import "./App.css";
import { Checkout } from "./checkout/Checkout.tsx";
import { useState } from "react";
import { Withdraw } from "./withdraw/Withdraw.tsx";

export const APP_THEME = {
  primary: "#2563eb",
  background: "#ffffff",
  backgroundAccent: "#f3f4f6",
  backgroundAccent2: "#e5e7eb",
  textColor: "#030712",
  textColorAccent: "#6b7280",
  textColorAction: "#ffffff",
};

enum CoinflowPages {
  Checkout = "Checkout",
  Withdraw = "Withdraw",
}

function App() {
  const [selectedPage, setSelectedPage] = useState<CoinflowPages>(
    CoinflowPages.Checkout,
  );
  return (
    <div
      className={
        "w-screen flex flex-col items-center bg-gray-50/20 justify-center text-gray-900 font-semibold text-sm py-20 px-5 space-y-5"
      }
    >
      <div
        className={
          "rounded-full h-12 p-1 bg-gray-100 flex items-center w-full md:w-60"
        }
      >
        {Object.values(CoinflowPages).map((page) => (
          <button
            className={`${selectedPage === page ? "bg-white font-semibold text-gray-950" : " font-medium text-gray-800"} transition text-xs h-full flex-1 rounded-full`}
            onClick={() => setSelectedPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div
        className={
          "w-full bg-white min-h-screen md:w-3/4 lg:w-1/2 ring-[0.5px] ring-gray-200 rounded-2xl overflow-hidden"
        }
      >
        {selectedPage === CoinflowPages.Checkout ? <Checkout /> : <Withdraw />}
      </div>
    </div>
  );
}

export default App;
