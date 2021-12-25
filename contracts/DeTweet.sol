// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DeTweet {
    
  struct Tweet {
    uint id;
    string content;
    address author;
    uint256 timestamp;
  }

  event NewTweet(address indexed from, uint256 timestamp, Tweet tweet);

  Tweet[] tweets;

  constructor() {
    console.log("DeTweet contract deployed!");
  }

  function sendTweet(string memory _content) public {
    console.log("%s tweeted w/ message %s", msg.sender, _content);

    Tweet memory tweet = Tweet(
      tweets.length,
      _content,
      msg.sender,
      block.timestamp
    );
    tweets.push(tweet);

    emit NewTweet(msg.sender, block.timestamp, tweet);
  }

  function getTweets() public view returns (Tweet[] memory) {
      return tweets;
  }
}