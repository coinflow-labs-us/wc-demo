import { useEffect, useState } from "react";
import { usePrivyWallet } from "./usePrivyWallet.tsx";

export function useCheckoutLink() {
  const [url, setUrl] = useState<string | undefined>();
  const { wallet } = usePrivyWallet();

  useEffect(() => {
    if (!wallet.publicKey) return;

    // In reality you would call this in your backend code
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "coinflow_sandbox_cc410448f7b84930abfcd91dc9c0bfd8_5a3ee221a6784bbd8888edea30701a25",
        "x-coinflow-auth-wallet": wallet.publicKey.toString(),
        "x-coinflow-auth-blockchain": "solana",
      },
      body: JSON.stringify({
        subtotal: { currency: "USD", cents: 100 },
        settlementType: "Credits",
      }),
    };

    fetch("https://api-sandbox.coinflow.cash/api/checkout/link", options)
      .then((res) => res.json())
      .then(({ link }) => setUrl(link))
      .catch((err) => console.error(err));
  }, []);

  return { url };
}
