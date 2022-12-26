import axios from 'axios'
export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions,
    getMarketData
}
//recieves USD, returns value in BC
async function getRate() {
    const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
    return res.data
}

function getMarketPrice() {

}

function getConfirmedTransactions() {

}
async function getMarketData() {
    const queries = ['market-price','avg-block-size','trade-volume']
        // marketPrice = axios.get('data/market-price.json').then(res => res.data.values.slice(0, 15))
    const marketData = []
    for (const query of queries) {
        let res = {title: query}
        res.data = await axios.get(`https://api.blockchain.info/charts/${query}?timespan=5months&format=json&cors=true`).then(res => res.data.values.slice(0, 25))
        res.data.forEach(d => {
            d.time = formatHHMM(d.x)
            d[query] = d.y
            delete d.x
            delete d.y
        })
        marketData.push(res)
    }
    return marketData
}

function formatHHMM(data) {
    const date = new Date(data)
    return (date.getHours() + '').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0')
}