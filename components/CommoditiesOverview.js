import { contractAddresses } from "../constants"
import { vaultabi, pricefeedabi, catabi } from "../constants/abis"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function CommoditiesOverview() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    console.log(chainId)
    // console.log(`ChainId is ${chainId}`)
    const vaultAddress =
        chainId in contractAddresses ? contractAddresses[chainId]["vaultAddress"] : null
    const commodities =
        chainId in contractAddresses ? contractAddresses[chainId]["commodities"] : null
    // State hooks
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
    const [commodityData, getCommodityData] = useState("0")

    const dispatch = useNotification()

    /* View Functions */

    // const { runContractFunction: getRecentWinner } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress,
    //     functionName: "getRecentWinner",
    //     params: {},
    // })

    async function updateUIValues() {
        //     const commodityPrices = []
        //     for (let i = 0; i < commodities.length; i++) {
        //         // Another way we could make a contract call:
        //         // const fee = await Moralis.executeFunction({
        //         //     functionName: "getEntranceFee",
        //         //     ...options,
        //         // })
        //         roundData = await Moralis.EvmApi.utils.runContractFunction({
        //             address: commodities[i][address],
        //             functionName: "latestRoundData",
        //             abi: pricefeedabi,
        //         })
        //         console.log(roundData)
        //         commodityPrices.push(roundData[1].toString())
        //     }
        //     // const entranceFeeFromCall = (await getEntranceFee()).toString()
        //     // const numPlayersFromCall = (await getPlayersNumber()).toString()
        //     // const recentWinnerFromCall = await getRecentWinner()
        //     // setEntranceFee(entranceFeeFromCall)
        //     // setNumberOfPlayers(numPlayersFromCall)
        //     // setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    const gold_price = 20
    const gold_minted = 2000
    const gold_marketcap = gold_price * gold_minted
    console.log(chainId)
    console.log(commodities)
    const gold_address = ""
    //const gold_address = commodities[0]["address"]

    const brentoil_price = 20
    const brentoil_minted = 2000
    const brentoil_marketcap = brentoil_price * brentoil_minted
    const brentoil_address = ""
    //const brentoil_address = commodities[1]["address"]

    const coal_price = 20
    const coal_minted = 2000
    const coal_marketcap = coal_price * coal_minted
    const coal_address = ""
    //const coal_address = commodities[2]["address"]

    const walletHasAPosition = true

    return (
        <div class="p-5">
            <h1 class="py-4 px-4 font-bold text-3xl">Commodities Overview</h1>

            <table id="commodity-overview-table" class="table">
                <thead>
                    <tr>
                        <th colspan="1">Commodities</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td width="16%">commodity</td>
                        <td width="16%">symbol</td>
                        <td width="20%">amount minted</td>
                        <td width="16%">price</td>
                        <td width="16%">market cap</td>
                        <td width="16%">address</td>
                    </tr>
                    <tr>
                        <td>Gold</td>
                        <td>XAU</td>
                        <td>{gold_minted}</td>
                        <td>{gold_price}</td>
                        <td>{gold_marketcap}</td>
                        <td>{gold_address}</td>
                    </tr>
                    <tr>
                        <td>Oil Brent</td>
                        <td>BRENTOIL</td>
                        <td>{brentoil_minted}</td>
                        <td>{brentoil_price}</td>
                        <td>{brentoil_marketcap}</td>
                        <td>{brentoil_address}</td>
                    </tr>
                    <tr>
                        <td>Coal</td>
                        <td>COAL</td>
                        <td>{coal_minted}</td>
                        <td>{coal_price}</td>
                        <td>{coal_marketcap}</td>
                        <td>{coal_address}</td>
                    </tr>
                </tbody>
            </table>
            <p className="br"></p>
            {walletHasAPosition ? (
                <div>
                    <table id="user-collateral" class="table">
                        <thead>
                            <tr>
                                <th colspan="2" align="left">
                                    Collateral supplied
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="25%">collateral</td>
                                <td align="right" width="25%">
                                    amount supplied
                                </td>
                                <td align="right" width="25%">
                                    price
                                </td>
                                <td align="right" width="25%">
                                    value
                                </td>
                            </tr>
                            <tr>
                                <td>WETH</td>
                                <td align="right" width="25%">
                                    {gold_minted}
                                </td>
                                <td align="right" width="25%">
                                    {gold_price}
                                </td>
                                <td align="right" width="25%">
                                    {gold_marketcap}
                                </td>
                            </tr>
                            <tr>
                                <td>WBTC</td>
                                <td align="right" width="25%">
                                    {brentoil_minted}
                                </td>
                                <td align="right" width="25%">
                                    {brentoil_price}
                                </td>
                                <td align="right" width="25%">
                                    {brentoil_marketcap}
                                </td>
                            </tr>
                            <tr>
                                <td>LINK</td>
                                <td align="right" width="25%">
                                    {coal_minted}
                                </td>
                                <td align="right" width="25%">
                                    {coal_price}
                                </td>
                                <td align="right" width="25%">
                                    {coal_marketcap}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="breakwithoutaline"></p>
                    <table id="user-mints" class="table">
                        <thead>
                            <tr>
                                <th colspan="2" align="left">
                                    Tokens minted
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="25%">collateral</td>
                                <td align="right" width="25%">
                                    amount supplied
                                </td>
                                <td align="right" width="25%">
                                    price
                                </td>
                                <td align="right" width="25%">
                                    value
                                </td>
                            </tr>
                            <tr>
                                <td>WETH</td>
                                <td align="right" width="25%">
                                    {gold_minted}
                                </td>
                                <td align="right" width="25%">
                                    {gold_price}
                                </td>
                                <td align="right" width="25%">
                                    {gold_marketcap}
                                </td>
                            </tr>
                            <tr>
                                <td>WBTC</td>
                                <td align="right" width="25%">
                                    {brentoil_minted}
                                </td>
                                <td align="right" width="25%">
                                    {brentoil_price}
                                </td>
                                <td align="right" width="25%">
                                    {brentoil_marketcap}
                                </td>
                            </tr>
                            <tr>
                                <td>LINK</td>
                                <td align="right" width="25%">
                                    {coal_minted}
                                </td>
                                <td align="right" width="25%">
                                    {coal_price}
                                </td>
                                <td align="right" width="25%">
                                    {coal_marketcap}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    "Connected user has no position"
                    <button class="button" id="openPosition">
                        mint token
                    </button>
                </div>
            )}
        </div>
    )
}
