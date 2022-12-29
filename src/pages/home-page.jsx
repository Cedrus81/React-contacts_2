// import { useMemo } from 'react'
import { bitcoinService } from '../services/bitcoin.service.js'
import { userService } from '../services/user.service'
import { Charts } from './chart';
import { Component, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransferList } from '../cmps/transfer-list.jsx';
import { getCurrentRate } from '../store/actions/bitcoin.actions'
import { useEffect } from 'react';
export const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.loggedInUser)
    const [rate, setRate] = useState(null)
    useEffect(() => {
        setRate(() => dispatch(getCurrentRate()))
    }, [])
    // if (!rate) return <h1>Loading BC rates...</h1>
    return (
        <main className="home-container flex column">
            <section className="home-header flex justify-center">
                <div className="home-header-info">
                    <h1>Welcome, {user?.name || 'Guest'}</h1>
                    {user && <h2>Your current balance is {user.coins}</h2>}
                    <h2>Current rate of BC to USD: {rate}</h2>
                </div>
                {user && <TransferList list={user.transactions} />}
            </section>
            <Charts />
        </main>
    )
}

