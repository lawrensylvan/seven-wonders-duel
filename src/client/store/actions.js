export const actions = {

    login: (name, password) => ({
        type: 'server/login',
        name,
        password
    }),

    getAllTables: () => ({
        type: 'server/getAllTables'
    }),

    createTable: () => ({
        type: 'server/createTable'
    }),

    joinTable: (id) => ({
        type: 'server/joinTable',
        id
    }),

    readyToPlay: (tableId) => ({
        type: 'server/readyToPlay',
        tableId
    }),

    getGameState: (tableId) => (tableId ?
        {
            type: 'server/getGameState',
            tableId
        } :
        {
            type: 'debug/serverlessGame'
        }
    ),
        
    play: (tableId, move) => ({
        type: 'server/move',
        tableId,
        move
    }),

}