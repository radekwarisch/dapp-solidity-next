import * as React from "react";

export const useConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const checkIfWalletIsConnected = React.useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        setLoading(false);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = React.useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return {
    currentAccount,
    connectWallet,
    walletLoading: loading,
  };
};
