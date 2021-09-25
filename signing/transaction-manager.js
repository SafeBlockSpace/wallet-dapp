import BigNumber from 'bignumber.js'
import { coins } from '@cosmjs/amino'
import {
  SigningStargateClient,
  assertIsBroadcastTxSuccess,
} from '@cosmjs/stargate'
import { getSigner } from './signer'
import messageCreators from './messages.js'
import fees from '~/common/fees'
import network from '~/common/network'

export function getFees(transactionType, feeDenom) {
  const { gasEstimate, feeOptions } = fees.getFees(transactionType)
  const fee = feeOptions.find(({ denom }) => denom === feeDenom)
  const coinLookup = network.getCoinLookup(fee.denom, 'viewDenom')
  // converting view fee to on chain fee
  const convertedFee = [
    {
      amount: BigNumber(fee.amount)
        .div(coinLookup.chainToViewConversionFactor)
        .toString(),
      denom: coinLookup.chainDenom,
    },
  ]
  return {
    gasEstimate: String(gasEstimate),
    fee: convertedFee,
  }
}

export async function createSignBroadcast({
  messageType,
  message,
  senderAddress,
  accountInfo,
  network,
  signingType,
  password,
  HDPath,
  feeDenom,
  chainId,
  memo,
  ledgerTransport,
}) {
  const feeData = getFees(messageType, feeDenom)
  const transactionData = {
    ...feeData,
    memo,
    chainId,
    accountNumber: accountInfo.accountNumber,
    accountSequence: accountInfo.sequence,
  }

  const signer = await getSigner(
    signingType,
    {
      address: senderAddress,
      password,
    },
    chainId,
    ledgerTransport
  )

  let messages = messageCreators[messageType](senderAddress, message, network)

  if (messages.length === undefined) {
    messages = [messages]
  }

  const stdFee = {
    amount: coins(
      Number(transactionData.fee[0].amount),
      transactionData.fee[0].denom
    ),
    gas: transactionData.gasEstimate,
  }

  const client = await SigningStargateClient.connectWithSigner(
    network.rpcURL,
    signer
  )
  const txResult = await client.signAndBroadcast(
    senderAddress,
    messages,
    stdFee,
    memo || ''
  )
  assertIsBroadcastTxSuccess(txResult)
  console.log(txResult)

  return {
    hash: txResult.transactionHash,
  }
}

export async function pollTxInclusion(txHash, iteration = 0) {
  const MAX_POLL_ITERATIONS = 30
  let txFound = false
  try {
    await fetch(`${network.apiURL}/txs/${txHash}`).then((res) => {
      if (res.status === 200) {
        txFound = true
      }
    })
  } catch (err) {
    // ignore error
  }
  if (txFound) {
    return true
  } else if (iteration < MAX_POLL_ITERATIONS) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return pollTxInclusion(txHash, iteration + 1)
  } else {
    throw new Error(
      `The transaction wasn't included in time. Check explorers for the transaction hash ${txHash}.`
    )
  }
}
