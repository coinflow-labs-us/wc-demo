import { useEffect, useState } from "react";
import { usePrivyWallet } from "./usePrivyWallet.tsx";

export function useCheckoutLink({ amount }: { amount: string }) {
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
        subtotal: { currency: "USD", cents: Math.floor(Number(amount) * 100) },
        settlementType: "Credits",
        theme: {
          style: "rounded",
          background: "#fdf3f3",
          primary: "#A32B29",
          backgroundAccent: "#fbe5e5",
          backgroundAccent2: "#f9d0cf",
          textColor: "#3f1110",
          textColorAccent: "#762726",
          textColorAction: "#fdf3f3",
        },
      }),
    };

    fetch("https://api-sandbox.coinflow.cash/api/checkout/link", options)
      .then((res) => res.json())
      .then(({ link }) => setUrl(link))
      .catch((err) => console.error(err));
  }, [amount, wallet.publicKey]);

  return { url };
}
