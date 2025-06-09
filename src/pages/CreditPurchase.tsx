import { usePrivyWallet } from "../hooks/usePrivyWallet.tsx";
import { useCheckoutLink } from "../hooks/useCheckoutLink.ts";
import { useHeight } from "../hooks/useHeight.ts";
import { useState } from "react";
import { AmountSelector } from "../components/AmountSelector.tsx";

export function CreditPurchase() {
  const [amount, setAmount] = useState("50");

  const { height } = useHeight();
  const { wallet } = usePrivyWallet();
  const { url } = useCheckoutLink({ amount });

  if (!wallet.publicKey) return null;

  return (
    <div className={"w-full sm:w-3/4 md:w-1/2 pr-0 lg:pr-[12%] pt-12"}>
      <AmountSelector amount={amount} setAmount={setAmount} />
      <div
        style={{ height: `${height}px` }}
        className={
          "w-full sm:px-[2%] lg:px-[5%] mt-20 sm:mt-10 sm:mb-10 overflow-auto sm:pt-0"
        }
      >
        <div
          className={
            "h-full rounded-t-xl sm:rounded-xl overflow-auto sm:overflow-hidden"
          }
        >
          <iframe className={"h-full w-full"} allow="payment" src={url} />
        </div>
      </div>
    </div>
  );
}
