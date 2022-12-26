export const userService = {
    getUser
}

var gUser = {
    name: 'Erez Eitan',
    coins: 100,
    moves: []
}

function getUser() {
    return gUser
}