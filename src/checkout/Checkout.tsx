import { CoinflowPurchase } from "@coinflowlabs/react";
import { useCallback } from "react";
import { useWallet } from "../hooks/useWallet.tsx";
import { APP_THEME } from "../App.tsx";
import { useHeightHandler } from "../hooks/useHeightHandler.tsx";

export function Checkout() {
  const { height, handleHeightChange } = useHeightHandler();
  const wallet = useWallet();

  const onSuccess = useCallback(() => {
    // Optional - TODO
  }, []);

  return (
    <div style={{ height }}>
      <CoinflowPurchase
        amount={undefined}
        transaction={undefined}
        wallet={wallet}
        merchantId={"coinflow"} // TODO
        env={"sandbox"}
        onSuccess={onSuccess}
        theme={APP_THEME}
        blockchain={"solana"} //TODO
        email={""}
        loaderBackground={APP_THEME.background}
        handleHeightChange={handleHeightChange}
      />
    </div>
  );
}
