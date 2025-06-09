import { useCallback, useEffect, useState } from "react";
import { usePrivyWallet } from "./usePrivyWallet.tsx";

export function useBalance() {
  const { wallet } = usePrivyWallet();
  const [balance, setBalance] = useState<{ cents: number } | undefined>(
    undefined,
  );

  const getBalance = useCallback(async () => {
    if (!wallet.publicKey) return;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-coinflow-auth-wallet": wallet.publicKey.toString(),
        "x-coinflow-auth-blockchain": "solana",
      },
    };

    fetch(
      "https://api-sandbox.coinflow.cash/api/customer/balances/testwc",
      options,
    )
      .then((res) => res.json())
      .then(({ credits }) => setBalance(credits))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  return { balance, getBalance };
}
