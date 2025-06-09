import { usePrivyWallet } from "../hooks/usePrivyWallet.tsx";
import { useState } from "react";
import { AmountSelector } from "../components/AmountSelector.tsx";
import { useBalance } from "../hooks/useBalance.ts";
import { useRedeemCredits } from "../hooks/useRedeemCredits.ts";

export function RedeemCredits() {
  const [amount, setAmount] = useState("10");
  const { wallet } = usePrivyWallet();
  const { balance, getBalance } = useBalance();
  const { redeemCredits, loading } = useRedeemCredits({ amount });

  if (!wallet.publicKey) return null;

  if (!balance) return <span>loading...</span>;

  return (
    <div className={"w-full sm:w-3/4 md:w-1/2 pr-0 lg:pr-[12%] pt-12"}>
      <AmountSelector amount={amount} setAmount={setAmount} />
      <div
        className={
          "flex flex-col justify-center items-center w-full sm:px-[2%] lg:px-[5%] mt-20 sm:mt-10 sm:mb-10 overflow-auto sm:pt-0 space-y-2"
        }
      >
        <div className={"bg-[#fbe5e5] rounded-xl text-[#3f1110] w-40 p-4"}>
          <span>Balance ${balance.cents / 100}</span>
        </div>
        <div className={"h-full"}>
          <button
            onClick={async () => {
              await redeemCredits();
              await getBalance();
            }}
            className={
              "bg-[#762726] rounded-xl text-[#fdf3f3] w-80 p-4 cursor-pointer"
            }
          >
            {loading ? "Loading..." : `Spend $${amount}`}
          </button>
        </div>
      </div>
    </div>
  );
}
