import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWalletContextProvider } from "./hooks/usePrivyWallet.tsx";
import { CreditPurchase } from "./pages/CreditPurchase.tsx";

function App() {
  return (
    <PrivyProvider
      appId="cltehkuq70chxmee356zvcp7e"
      config={{
        loginMethods: ["email"],
      }}
    >
      <PrivyWalletContextProvider>
        <div
          className={
            "w-screen flex flex-col items-center bg-gray-50/20 justify-center text-gray-900 font-semibold text-sm space-y-5"
          }
        >
          <CreditPurchase />
        </div>
      </PrivyWalletContextProvider>
    </PrivyProvider>
  );
}

export default App;
