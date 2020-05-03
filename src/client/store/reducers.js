
const tables = (tables = [], action) => {
    switch (action.type) {

        case 'server/createTable':
            return tables

        case 'tableCreated':
            return [...tables, action.table]

        case 'server/getAllTables':
            return tables

        case 'refreshTables':
            return action.tables

        default:
            return tables
    }
}

const reducers = {
    tables
}

export default reducers