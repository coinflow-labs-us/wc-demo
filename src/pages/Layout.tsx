import { usePrivyWallet } from "../hooks/usePrivyWallet.tsx";
import { useEffect, useState } from "react";
import { CreditPurchase } from "./CreditPurchase.tsx";
import { ModeSelector } from "../components/ModeSelector.tsx";
import { RedeemCredits } from "./RedeemCredits.tsx";

export function Layout() {
  const [mode, setMode] = useState<"topUp" | "redeem">("topUp");
  const { wallet } = usePrivyWallet();

  if (!wallet.publicKey) return <Login />;

  return (
    <div
      style={{ backgroundColor: "#F8F9FA" }}
      className={
        "flex flex-col overflow-y-scroll sm:flex-row sm:h-screen overflow-auto w-full"
      }
    >
      <div
        style={{ backgroundColor: "#F8F9FA" }}
        className={
          "flex-grow sm:h-full fixed top-0 left-0 w-full sm:w-1/4 md:w-1/2"
        }
      >
        <SideBar mode={mode} setMode={setMode} />
      </div>
      <div className={"hidden sm:block flex-grow h-full"} />
      {mode === "topUp" && <CreditPurchase />}
      {mode === "redeem" && <RedeemCredits />}
      <div
        style={{ backgroundColor: "#090A0C" }}
        className={"block sm:hidden flex-grow w-full"}
      />
    </div>
  );
}

function SideBar({
  mode,
  setMode,
}: {
  mode: "topUp" | "redeem";
  setMode: (amount: "topUp" | "redeem") => void;
}) {
  return <HeaderSection mode={mode} setMode={setMode} />;
}

function HeaderSection({
  mode,
  setMode,
}: {
  mode: "topUp" | "redeem";
  setMode: (amount: "topUp" | "redeem") => void;
}) {
  return (
    <div className="flex space-x-2 sm:space-x-0 flex-row sm:flex-col space-y-4 items-start sm:max-w-md px-6 pt-6 lg:pt-20 lg:ml-[12%] relative lg:fixed lg:top-6 left-0">
      <div className="flex items-center">
        <LogoImage
          src={
            "https://play-lh.googleusercontent.com/raaaYXwGh7qcx3X9KzKgQe2eQ9S37W7Am87PjSDrF7wDgDcAa02HdFn0ZKymFbDLgBc"
          }
          alt="coinflow"
          className="size-4 lg:size-6"
          containerClassName="size-7 lg:size-10 bg-[#a32b29] border-action"
        />
      </div>
      <ModeSelector mode={mode} setMode={setMode} />
      <span className="text-xs sm:text-sm lg:text-lg font-semibold text-action">
        {mode === "topUp"
          ? "Top up your Wind Creek balance"
          : "Spend your Wind Creek balance"}
      </span>
    </div>
  );
}

function LogoImage({
  src,
  alt,
  className,
  containerClassName,
  style,
}: {
  style?: React.CSSProperties;
  src: string | undefined;
  alt: string;
  className: string;
  containerClassName: string;
}) {
  if (!src) return null;

  return (
    <div
      style={style}
      className={`flex items-center justify-center rounded-full overflow-hidden border-2 ${containerClassName}`}
    >
      <img
        className={`rounded-full object-contain ${className}`}
        src={src}
        alt={alt}
      />
    </div>
  );
}

export function Login() {
  const { wallet, login } = usePrivyWallet();

  useEffect(() => {
    if (wallet.publicKey) return;
    login();
  }, []);

  return (
    <div
      className={"flex justify-center items-center flex-1 relative bg-white"}
    >
      <div
        className={"absolute top-0 bottom-0 w-full animate-pulse bg-gray-100"}
      />
      <div
        className={
          "relative bg-white flex flex-col items-center space-y-5 p-8 rounded-2xl ring-[0.5px] ring-gray-200"
        }
      >
        <span className={"text-gray-900 font-medium text-sm"}>Loading...</span>
      </div>
    </div>
  );
}
