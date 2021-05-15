import {stepHandler} from '../../core/stepHandler'

const session = (session = {isLoggedIn:false}, action) => {
    switch (action.type) {
        case 'loggedIn':
            return {
                isLoggedIn: true,
                name: action.name
            }

        case 'debug/serverlessGame':
            return {
                isLoggedIn: true,
                name: 'Laurent'
            }

        default:
            return session;
    }
}

const tables = (tables = [], action) => {
    switch (action.type) {
        case 'refreshTables':
            return action.tables
            
        case 'tableCreated':
            return [...tables, action.table]

        case 'tableUpdated':
            return tables.map(t => t.id===action.table.id ? action.table : t)

        case 'debug/serverlessGame':
            return [{
                    id: 0,
                    creator: 'Laurent',
                    players: ['Laurent', 'Nadège'],
                    playersReady: [true, true], // todo
                    status: 'WAITING_FOR_MORE_PLAYERS' // todo
            }]

        default:
            return tables
    }
}

const games = (games = [], action) => {
    const {tableId, state, step} = action
    switch (action.type) {
        case 'gameStarted':
            return [...games, {
                tableId: tableId,
                state: state,
                steps: []
            }]

        case 'refreshGameState':
            if(games.some(g => g.tableId===tableId)) {
                return games.map(g => g.tableId===tableId ? {
                    ...g,
                    state: state,
                    steps: g.steps
                } : g)
            } else {
                return [...games, {
                    tableId: tableId,
                    state: state,
                    steps: []
                }]
            }

        case 'gameStepPushed':
            return games.map(g => g.tableId===tableId ? {
                ...g,
                state: stepHandler(step, g.state),
                steps: [...g.steps, step]
            } : g)

        case 'debug/serverlessGame':
            return [{
                tableId : 0,
                state: {
                    players: ['Laurent', 'Nadège'],
                    toPlay: 'Laurent',
                    militaryPosition: 2,
                    progressTokens: ['agriculture', 'mathematics', null, 'masonry', null],
                    city: ['law']
                },
                steps: []
            }]

        case 'debug/advanceMilitary':
            return [{
                tableId : 1,
                
                state: {
                    players: ['Laurent', 'Nadège'],
                    toPlay: 'Nadège',
                    militaryPosition: 3,
                    progressTokens: [null, 'economy', 'strategy', 'architecture', 'theology'],
                    wondersToSelect: ['greatLibrary', null, null, 'pyramids'],
                    cities: [{
                        wonders: ['zeus', 'mausoleum']
                    }]
                },
                steps: []
            }]

        default:
            return games
    }
}

const reducers = {
    session,
    tables,
    games
}

export default reducers