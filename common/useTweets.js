import * as React from "react";
import { ethers } from "ethers";
import contract from "./DeTweet.json";

const getContract = () => {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(
      process.env.NEXT_PUBLIC_DE_TWEET_ADDRESS,
      contract.abi,
      signer
    );
  } else {
    console.log("Ethereum object doesn't exist!");
  }
};

export const useTweets = () => {
  const [tweets, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchTweets = React.useCallback(async () => {
    try {
      const contract = getContract();

      const tweets = await contract.getTweets();
      const parsedTweets = tweets.map((tweet) => ({
        id: tweet.id,
        content: tweet.content,
        author: tweet.author,
        timestamp: new Date(tweet.timestamp.toNumber() * 1000),
      }));
      console.log("Retrieved tweets", parsedTweets);
      setTweets(parsedTweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const tweet = React.useCallback(async (message) => {
    try {
      setLoading(true);
      const contract = getContract();

      /*
       * Execute the actual tweet from your smart contract
       */
      const tweetTxn = await contract.sendTweet(message);
      console.log("Mining...", tweetTxn.hash);

      await tweetTxn.wait();
      console.log("Mined -- ", tweetTxn.hash);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const onNewTweet = React.useCallback((from, author, tweet) => {
    setTweets((prevState) => [
      ...prevState,
      {
        id: tweet.id,
        content: tweet.content,
        author: tweet.author,
        timestamp: new Date(tweet.timestamp.toNumber() * 1000),
      },
    ]);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchTweets();

    const contract = getContract();

    contract.on("NewTweet", onNewTweet);

    return () => {
      if (contract) {
        contract.off("NewTweet", onNewTweet);
      }
    };
  }, [fetchTweets, onNewTweet]);

  return { tweets, tweet, tweetsLoading: loading };
};
