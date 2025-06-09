import { usePrivyWallet } from "./usePrivyWallet.tsx";
import { useCallback, useState } from "react";
import { VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";

export function useRedeemCredits({ amount }: { amount: string }) {
  const { wallet } = usePrivyWallet();
  const [loading, setLoading] = useState(false);

  const redeemCredits = useCallback(async () => {
    if (!wallet.publicKey) return;
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-coinflow-auth-wallet": wallet.publicKey.toString(),
        "x-coinflow-auth-blockchain": "solana",
      },
      body: JSON.stringify({
        subtotal: { cents: Number(amount) * 100 },
        merchantId: "testwc",
      }),
    };

    const tx: string = await fetch(
      "https://api-sandbox.coinflow.cash/api/redeem/merchant",
      options,
    )
      .then((res) => res.json())
      .then(({ transaction }) => transaction)
      .catch((err) => console.error(err));

    const signedTx = await wallet.signTransaction(
      VersionedTransaction.deserialize(base58.decode(tx)),
    );
    const serializedTx = base58.encode(signedTx.serialize());

    const options2 = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        merchantId: "testwc",
        signedTransaction: serializedTx,
      }),
    };

    await fetch(
      "https://api-sandbox.coinflow.cash/api/utils/send-coinflow-tx",
      options2,
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    console.log("SUCCESS!!");

    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }, [amount]);

  return {
    loading,
    redeemCredits: () => redeemCredits().finally(() => setLoading(false)),
  };
}
