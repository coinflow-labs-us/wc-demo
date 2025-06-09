import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  useSolanaWallets,
  usePrivy,
  LoginModalOptions,
} from "@privy-io/react-auth";

export interface PrivyWalletContextProps {
  wallet: {
    publicKey: PublicKey | null;
    signTransaction: <T extends Transaction | VersionedTransaction>(
      t: T,
    ) => Promise<T>;
  };
  connection: Connection;
  ready: boolean;
  login: (options?: LoginModalOptions) => void;
  logout: () => void;
}

const PrivyWalletWalletContext = createContext<PrivyWalletContextProps | null>(
  null,
);

export function PrivyWalletContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { wallets, createWallet: createSolanaWallet } = useSolanaWallets();
  const {
    ready,
    user,
    login,
    logout,
    authenticated,
    isModalOpen,
    createWallet: createEvmWallet,
  } = usePrivy();

  const connection = useMemo(() => {
    return new Connection(
      "https://rude-elbertine-fast-devnet.helius-rpc.com",
      "confirmed",
    );
  }, []);

  const createWallets = useCallback(async () => {
    if (user) {
      const hasExistingSolanaWallet = !!user.linkedAccounts.find(
        (account) =>
          account.type === "wallet" &&
          account.walletClientType === "privy" &&
          account.chainType === "solana",
      );
      if (!hasExistingSolanaWallet) {
        if (user.linkedAccounts.length === 1) await createEvmWallet(); // Privy docs recommend creating EVM wallet first
        await createSolanaWallet();
      }
    }
  }, [createEvmWallet, createSolanaWallet, user]);

  useEffect(() => {
    if (user && authenticated && !isModalOpen) createWallets().catch();
  }, [authenticated, createWallets, user, isModalOpen]);

  const solanaWallet = useMemo(() => {
    if (!user || wallets.length === 0) return null;

    const nonEmbedded = wallets.find((w) => w.connectorType !== "embedded");
    if (nonEmbedded) return nonEmbedded;

    const embedded = wallets.filter((w) => w.connectorType === "embedded");
    return embedded[0];
  }, [user, wallets]);

  const signTransaction = useCallback(
    async <T extends Transaction | VersionedTransaction>(
      transaction: T,
    ): Promise<T> => {
      return await solanaWallet!.signTransaction(transaction);
    },
    [solanaWallet],
  );

  const address = !!user && solanaWallet?.address;
  const publicKey = useMemo(() => {
    return address ? new PublicKey(address) : null;
  }, [address]);

  return (
    <PrivyWalletWalletContext.Provider
      value={{
        wallet: {
          publicKey,
          signTransaction,
        },
        connection,
        ready,
        login,
        logout,
      }}
    >
      {children}
    </PrivyWalletWalletContext.Provider>
  );
}

export const usePrivyWallet = () => {
  const ctx = useContext(PrivyWalletWalletContext);
  if (!ctx)
    throw new Error(
      "usePrivyWallet must be called under PrivyWalletContextProvider",
    );

  return ctx;
};
