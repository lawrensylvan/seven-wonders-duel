
const session = (session = {isLoggedIn:false}, action) => {
    switch (action.type) {
        case 'loggedIn':
            return {
                isLoggedIn: true,
                name: action.name
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
                state: step,
                steps: [...g.steps, step]
            } : g)

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