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
        users = gUsers
        storageService.save(USERS_KEY, users)
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function signup(name) {
    const user = _makeUser(name)
    _setLoggedInUser(user)
    saveUser(user)
}

function login(name) {
    const user = gUsers.find(user => user.name === name)
    if (user) _setLoggedInUser(user)
    else {
        throw new Error(`User ${name} not found`)
    }
}

function _setLoggedInUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function addTransaction(contact, amount) {
    const user = getLoggedInUser()
    user.transactions.unshift({
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount,
    })
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
    storageService.setItem(USERS_KEY, gUsers)
}

function _makeUser(name) {
    return {
        _id: utilService.makeId(),
        name,
        coins: 100,
        transactions: []
    }
}