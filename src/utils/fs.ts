import * as fs from 'fs'

export const ReadData = () => {
    return JSON.parse(fs.readFileSync('./db/db.json').toString())
}

export const WriteData = (db: any): void => {
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
}