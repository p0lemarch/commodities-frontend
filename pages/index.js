import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import Positions from "../components/Positions"
import CommoditiesOverview from "../components/CommoditiesOverview"

function getComponent() {
    let component
    switch (this.state.currentComponent) {
        case "positions":
            component = <Positions />
            break
        case "overview":
            component = <CommoditiesOverview />
            break
    }
    return component
}

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>CAT</title>
                <meta name="description" content="Commodity Minting Protocol" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <CommoditiesOverview />
        </div>
    )
}
