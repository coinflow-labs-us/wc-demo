import { useCallback, useMemo } from "react";

export type SolanaWallet = {
  address: string | null | undefined;
  sendTransaction: (transaction: unknown) => Promise<{ hash: string }>;
  signMessage: (message: string) => Promise<string>;
};

export function useWallet(): SolanaWallet {
  // TODO replace with own wallet
  const wallet = useMemo(() => {
    return { publicKey: "", privateKey: "" };
  }, []);

  const address = wallet.publicKey.toString(); // TODO replace

  // TODO replace with own wallet
  const sendTransaction = useCallback(
    async (transaction: unknown): Promise<{ hash: string }> => {
      return { hash: "" };
    },
    [],
  );

  // TODO replace own wallet
  const signMessage = useCallback(async (message: string): Promise<string> => {
    return "";
  }, []);

  return {
    address,
    sendTransaction,
    signMessage,
  };
}
