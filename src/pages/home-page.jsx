// import { useMemo } from 'react'
import { bitcoinService } from '../services/bitcoin.service.js'
import { userService } from '../services/user.service'
import { Charts } from './chart';
import { Component } from 'react'

export class HomePage extends Component {
    state = {
        rate: null,
        user: null,
    }
    componentDidMount() {
        this.getRate()
        this.setState({ user: userService.getLoggedInUser() })
    }
    async getRate() {
        const rate = await bitcoinService.getRate()
        this.setState({ rate })
    }

    render() {
        const { rate, user } = this.state
        if (!rate) return <h1>Loading BC rates...</h1>
        return (
            <main className="home-container flex column">
                <h1>Welcome, {user?.name || 'Guest'}</h1>
                {user && <h2>Your current balance is {user.coins}</h2>}
                <h2>Current rate of BC to USD: {rate}</h2>
                <Charts />
            </main>
        )
    }
}
