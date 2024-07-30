import { pool } from "../config/db.js"
import bcrypt from 'bcrypt'


const create = async (name, last_name, user_name, password, rol_id, departamento) => {
    const hash = await bcrypt.hash(password, 10)
    const fecha = new Date()
    const [nuevoRegistro] = await pool.execute('INSERT INTO users (name, last_name, user_name, password, rol_id, departamento, fecha_de_creacion) VALUES(?,?,?,?,?,?,?)', [name, last_name, user_name, hash, rol_id, departamento, fecha.toISOString()])

    return nuevoRegistro
}

const login = async (columna, valor) => {
    const [resultado] = await pool.execute(`SELECT * FROM users WHERE ${columna} = ?`, [valor])
    return resultado
}

const allReports = async () => {
const [resultado] = await pool.execute(`SELECT * FROM reports`)
return resultado
}

const mReports = async (valor) => {
    const [resultado] = await pool.execute(`SELECT * FROM reports WHERE user_id = ?`, [valor])
    return resultado
}

const createReports = async ( section, description, location, img,user_id) => {
    const fecha = new Date()
    const [newReport] = await pool.execute(`INSERT INTO reports (date, section, description, location, img, user_id) VALUES (?,?,?,?,?,?)`, [fecha, section, description, location, img,user_id])
    return newReport
}

const eliminateReport = async (id) => {
    const [resultado] = await pool.execute('DELETE FROM reports WHERE report_id = ?', [id])
    return resultado
}


export default {create, login, allReports, createReports, mReports, eliminateReport}