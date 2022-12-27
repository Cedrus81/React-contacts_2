import { storageService } from './storage.service'
import { utilService } from './util.service'

export const userService = {
    getLoggedInUser,
    login,
    signup,
    logout,
    addTransaction
}

const USERS_KEY = 'users'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

var gUsers = [{
    _id: 'u100',
    name: 'Erez Eitan',
    coins: 100,
    transactions: []
}]
setUsers()
function setUsers() {
    let users = storageService.load(USERS_KEY)
    if (!users || !users.length) {
        debugger
        users = gUsers
        storageService.save(USERS_KEY, users)
    }
}


function getLoggedInUser() {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return user === 'undefined' ? null : JSON.parse(user)
}

function signup(name) {
    const user = _makeUser(name)
    saveUser(user)
    _setLoggedInUser(user._id)
}

function login(name) {
    const user = gUsers.find(user => user.name === name)
    if (user) _setLoggedInUser(user._id)
    else {
        throw new Error(`User ${name} not found`)
    }
}

function _setLoggedInUser(userId) {
    const users = storageService.load(USERS_KEY)
    const user = users.find(user => user._id === userId)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function addTransaction(contact, amount) {
    const user = getLoggedInUser()
    if (!user) throw new Error('You must be logged in')
    if (amount > user.coins) throw new Error(`Insufficient funds, you are missing ${amount - user.coins} coins for that action`)

    user.transactions.unshift({
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount,
    })
    user.coins -= amount
    saveUser(user)
}

function saveUser(user) {
    if (!user) user = getLoggedInUser()
    if (user._id) {
        const idx = gUsers.findIndex(u => u._id === user._id)
        gUsers[idx] = user
    } else {
        gUsers.push(user)
    }
    storageService.save(USERS_KEY, gUsers)
    _setLoggedInUser(user._id)
}

function _makeUser(name) {
    return {
        _id: utilService.makeId(),
        name,
        coins: 100,
        transactions: []
    }
}