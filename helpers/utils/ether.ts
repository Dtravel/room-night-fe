import { PROPERTY_CONTRACT_ABI, MIN_ABI, TOKEN_CONTRACT_ABI } from "./abi";
import { isBSC, isMobileDevice } from "@dtravel/helpers/utils/common";
import {
  setAccounts,
  setChainId,
  setToastError,
} from "@dtravel/redux/slices/common";
import { store } from "@dtravel/redux/store";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, utils } from "ethers";
import { PROVIDER_NETWORKS } from "../constants/constants";
import { updateTransactionHash } from "../api/booking";

const ethereum =
  typeof window === "undefined" ? null : (window as any).ethereum;

export const fetchChainId = async () => {
  try {
    const chainId = await getChainId();
    if (chainId) store.dispatch(setChainId(chainId));
  } catch (error) {
    console.log(error);
  }
};
export const startApp = async (provider: any) => {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (!provider) {
    // store.dispatch(setToastError({ message: 'Please install MetaMask!' }))
    return;
  }
  if (provider !== window.ethereum) {
    // store.dispatch(setToastError({ message: 'Do you have multiple wallets installed?' }))
    return;
  }
  // Access the decentralized web!
  // const ethereum = (window as any).ethereum
  ethereum.on("chainChanged", handleChainChanged);

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  ethereum.on("accountsChanged", handleAccountsChanged);

  const accounts = await getAccounts();
  store.dispatch(setAccounts(accounts));
  fetchChainId();
};

/*
  https://docs.metamask.io/guide/rpc-api.html#restricted-methods
  wallet_requestPermissions: This RPC method is not yet available in MetaMask Mobile.
  For mobile: use Browser in MetaMask App
 */
export const connectWallet = async () => {
  const provider = await detectEthereumProvider();
  if (!provider) {
    // open deeplink
    // https://metamask.app.link/dapp/dtravel-direct.dataismist.com/
    // const url = `https://metamask.app.link/dapp/${window.location.href}`
    if (!isMobileDevice()) {
      // const url = `metamask://dapp/${window.location.href}`;
      const url = `https://metamask.app.link/dapp/${window.location.host}/`;
      window.open(url);
    }
  }
  try {
    const accounts = await getAccounts();
    if (accounts.length === 0) {
      return await ethereum.request({ method: "eth_requestAccounts" });
    }
    return accounts;
  } catch (err) {
    if (err instanceof TypeError) {
      throw {
        code: "uninstall_metamask",
        message:
          "Please open the site in Metamask mobile app browser to connect to Dtravel",
      };
    }
    throw err;
  }
};

export const getAccounts = async () => {
  return await ethereum.request({ method: "eth_accounts" });
};

export const getCurrentAccount = async () => {
  const accounts = await (window as any).ethereum.request({
    method: "eth_accounts",
  });
  return accounts.length > 0 ? accounts[0] : "";
};

export const getChainId = async () => {
  return await (window as any).ethereum.request({ method: "eth_chainId" });
};

export const handleChainChanged = async (newChainId: any) => {
  // We recommend reloading the page, unless you must do otherwise
  // window.location.reload()
  if (newChainId) store.dispatch(setChainId(newChainId));
};

// For now, 'eth_accounts' will continue to always return an array
export const handleAccountsChanged = async (accounts: string[]) => {
  store.dispatch(setAccounts(accounts));
};

export const getSignature = async (publicAddress: string, nonce: string) => {
  return await (window as any).ethereum.request({
    method: "personal_sign",
    params: [`Signing one-time nonce: ${nonce}`, publicAddress, ""],
  });
};

export const switchToBscNetwork = async () => {
  const chainId = process.env.NEXT_PUBLIC_SUPPORT_BSC_CHAIN_ID;
  const chainName =
    PROVIDER_NETWORKS.find((v) => v?.hex === chainId)?.name || "";
  const rpcUrl = process.env.NEXT_PUBLIC_BSC_RPC_URL;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainId,
              chainName: chainName,
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: [rpcUrl],
              blockExplorerUrls: ["https://bscscan.com"],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    } else {
      store.dispatch(setToastError({ message: switchError?.message }));
    }
    // handle other "switch" errors
  }
};
// https://medium.com/@mwhc00/list-of-chain-ids-for-metamask-1b24cd7813af
export const switchToETHNetwork = async () => {
  const chainId = process.env.NEXT_PUBLIC_SUPPORT_ETH_CHAIN_ID;
  const chainName =
    PROVIDER_NETWORKS.find((v) => v?.hex === chainId)?.name || "";
  const rpcUrl = process.env.NEXT_PUBLIC_ETH_RPC_URL;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainId,
              chainName: chainName,
              nativeCurrency: {
                name: "SepoliaETH",
                symbol: "SepoliaETH",
                decimals: 18,
              },
              rpcUrls: [rpcUrl],
              blockExplorerUrls: ["https://sepolia.etherscan.io/"],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    } else {
      store.dispatch(setToastError({ message: switchError?.message }));
    }
    // handle other "switch" errors
  }
};

export const handleBookCrypto = async (
  bookingData: any,
  tokenAddress: string,
  OPSWalletAddress: string,
  setLoading: any,
  goToBookingSummary: any
) => {
  // const maxNumber = BigNumber.from('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') // 2^256 - 1
  const isNeedApproved =
    tokenAddress !== "0x0000000000000000000000000000000000000000";
  try {
    const {
      token,
      bookingId,
      guestWallet,
      propertyContract,
      checkinDateInTimestamp,
      checkoutDateInTimestamp,
      bookingExpirationInTimestamp,
      cancellationPolicies,
      bookingAmount,
      decimal,
      damageProtectionFee,
      feeReceiver,
      kygStatus,
    } = bookingData?.rawSignature as any;
    const { signature, reservationId } = bookingData;

    const provider = new ethers.providers.Web3Provider(
      (window as any)?.ethereum
    );
    const signer = provider.getSigner(guestWallet);
    const contract = new ethers.Contract(token, TOKEN_CONTRACT_ABI, signer);
    const resTransfer = await contract.transfer(
      OPSWalletAddress,
      utils.parseUnits(String(bookingAmount), decimal)
    );
    if (resTransfer?.hash) {
      await updateTransactionHash(reservationId, resTransfer?.hash);
      setLoading(false);
      goToBookingSummary(reservationId);
    }
  } catch (error: any) {
    console.log("error catch", error);
    setLoading(false);
    store.dispatch(
      setToastError({ message: error?.data?.message || error?.message })
    );
  }
};
export const getBalance = async (
  tokenAddress: string,
  walletAddress: string
) => {
  const provider = new ethers.providers.Web3Provider((window as any)?.ethereum);
  const contract = new ethers.Contract(tokenAddress, MIN_ABI, provider);
  // const balance = await contract.balanceOf(walletAddress)
  // return utils.formatEther(balance)
  return await contract.balanceOf(walletAddress);
};
export const getBalanceETH = async (walletAddress: string) => {
  const provider = new ethers.providers.Web3Provider((window as any)?.ethereum);
  const balance = await provider.getBalance(walletAddress);
  return balance;
};

export const cancelBookingSmartContract = async (
  bookingId: string,
  guestWallet: string,
  propertyContract: string
) => {
  const provider = new ethers.providers.Web3Provider((window as any)?.ethereum);
  const signer = provider.getSigner(guestWallet);
  const contract = new ethers.Contract(
    propertyContract,
    PROPERTY_CONTRACT_ABI,
    signer
  );
  // console.log('cancel info', bookingId, guestWallet, propertyContract)
  return contract.cancel(Number(bookingId));
};
