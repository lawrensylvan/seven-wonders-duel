
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
        case 'tableCreated':
            return [...tables, action.table]

        case 'tableUpdated':
            return tables.map(t => t.id===action.table.id ? action.table : t)

        case 'refreshTables':
            return action.tables

        default:
            return tables
    }
}

const reducers = {
    session,
    tables,
}

export default reducers