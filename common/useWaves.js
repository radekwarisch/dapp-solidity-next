import * as React from "react";
import { ethers } from "ethers";
import contract from "./WavePortal.json";

const getContract = () => {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(
      process.env.NEXT_PUBLIC_WAVE_PORTAL_ADDRESS,
      contract.abi,
      signer
    );
  } else {
    console.log("Ethereum object doesn't exist!");
  }
};

export const useWaves = () => {
  const [waves, setWaves] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const fetchWaves = React.useCallback(async () => {
    try {
      const contract = getContract();

      const count = await contract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
      setWaves(count.toNumber());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const wave = React.useCallback(async () => {
    try {
      setLoading(true);
      const contract = getContract();

      /*
       * Execute the actual wave from your smart contract
       */
      const waveTxn = await contract.wave("msg", { gasLimit: 300000 });
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      await fetchWaves();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [fetchWaves]);

  React.useEffect(() => {
    fetchWaves();
  }, [fetchWaves]);

  return { waves, wave, wavesLoading: loading };
};
