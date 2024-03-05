import { CoinflowWithdraw } from "@coinflowlabs/react";
import { useWallet } from "../hooks/useWallet.tsx";
import { APP_THEME } from "../App.tsx";
import { useCallback } from "react";
import { useHeightHandler } from "../hooks/useHeightHandler.tsx";

export function Withdraw() {
  const wallet = useWallet();
  const { height, handleHeightChange } = useHeightHandler();

  const onSuccess = useCallback(() => {
    // Optional - TODO
  }, []);

  return (
    <div style={{ height }}>
      <CoinflowWithdraw
        theme={APP_THEME}
        wallet={wallet}
        merchantId={"coinflow"} // TODO
        env={"sandbox"}
        onSuccess={onSuccess}
        blockchain={"solana"} // TODO
        email={""}
        loaderBackground={APP_THEME.background}
        handleHeightChange={handleHeightChange}
      />
    </div>
  );
}
