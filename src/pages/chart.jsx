import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service';

export class Charts extends Component {
    state = {
        marketData: null
    }
    async componentDidMount() {
        const marketData = await bitcoinService.getMarketData()
        this.setState({ marketData })

    }
    render() {
        if (!this.state.marketData) return <h1>Loading Data..</h1>
        const { marketData } = this.state
        return (
            <article className="flex wrap justify-center">
                {marketData.map(category => {
                    return <section className="chart-piece" key={category.title}>
                        <h1>{category.title}</h1>
                        <LineChart width={600} height={300} data={category.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey={category.title} stroke="#f95959" />
                            <CartesianGrid stroke="#233142" strokeDasharray="5 5" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </section>
                }
                )}

            </article>
        )
    }
}
