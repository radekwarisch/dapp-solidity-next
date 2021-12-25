import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useConnectWallet } from "../common/useConnectWallet";
import { useWaves } from "../common/useWaves";
import {
  Spinner,
  Text,
  Button,
  Flex,
  Input,
  Box,
  Media,
  Avatar,
} from "brainly-style-guide";
import { Headline } from "brainly-style-guide";
import { useTweets } from "../common/useTweets";

export default function Home() {
  const [tweetInput, setTweetInput] = React.useState("");
  const { connectWallet, currentAccount, walletLoading } = useConnectWallet();
  const { waves, wave, wavesLoading } = useWaves();

  const { tweet, tweets, tweetsLoading } = useTweets();

  const submitTweet = React.useCallback(() => {
    if (tweetInput.length > 0) {
      tweet(tweetInput);
      setTweetInput("");
    }
  }, [tweetInput, tweet]);

  const wavesContent = (
    <Box color="mustard-secondary-light">
      <Headline align="center">Waves</Headline>

      {currentAccount ? (
        <>
          <div className="waves">
            {wavesLoading ? <Spinner /> : <Text>Count: {waves} </Text>}
          </div>

          <Button className="waveButton" onClick={wave}>
            Wave
          </Button>
        </>
      ) : null}

      {/*
       * If there is no currentAccount render this button
       */}
      {!currentAccount && (
        <>
          <Text align="center">
            Connect your Ethereum wallet and wave at me!
          </Text>
          <Button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </>
      )}
    </Box>
  );

  const tweetsContent = (
    <Box color="peach-secondary">
      <Headline align="center">DeTweet</Headline>

      {tweetsLoading ? (
        <Spinner />
      ) : (
        tweets.map((tweet) => (
          <Media
            key={tweet.id}
            contentArray={[
              <Text key={tweet.id}>{tweet.author}</Text>,
              <Headline key={tweet.id}>{tweet.content}</Headline>,
            ]}
            aside={<Avatar key={tweet.id} />}
          />
        ))
      )}

      <Flex margin="m">
        <Input
          color="white"
          placeholder="Type your message"
          fullWidth
          value={tweetInput}
          onChange={(e) => setTweetInput(e.target.value)}
        />
        <Button onClick={submitTweet}>Send</Button>
      </Flex>
    </Box>
  );

  return (
    <Flex margin="m" direction="column" alignItems="space-between">
      <Flex direction="column" margin="m">
        {walletLoading ? <Spinner /> : wavesContent}
      </Flex>

      <Flex direction="column" margin="m">
        {walletLoading ? <Spinner /> : tweetsContent}
      </Flex>
    </Flex>
  );
}
