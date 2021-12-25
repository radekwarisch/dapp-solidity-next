const main = async () => {
  const deTweetContractFactory = await hre.ethers.getContractFactory("DeTweet");
  const deTweetContract = await deTweetContractFactory.deploy();
  await deTweetContract.deployed();
  console.log("Contract address:", deTweetContract.address);

  let tweetTxn = await deTweetContract.sendTweet("A message!");
  await tweetTxn.wait(); // Wait for the transaction to be mined

  const [_, randomPerson] = await hre.ethers.getSigners();

  const newTweetPromise = new Promise((resolve) => {
    deTweetContract.on("NewTweet", (id, content, author) => {
      console.log("New tweet:", id, content, author);
      resolve();
    });
  });

  tweetTxn = await deTweetContract
    .connect(randomPerson)
    .sendTweet("Another message!");
  await tweetTxn.wait(); // Wait for the transaction to be mined

  let tweets = await deTweetContract.getTweets();
  console.log(tweets);

  await newTweetPromise;
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
