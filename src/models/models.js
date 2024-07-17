import { pool } from "../config/db.js"
import bcrypt from 'bcrypt'

const create = async (name, last_name, user_name, password, rol_id) => {
    const hash = await bcrypt.hash(password, 10)
    const [nuevoRegistro] = await pool.execute('INSERT INTO users (name, last_name, user_name, password, rol_id) VALUES(?,?,?,?,?)', [name, last_name, user_name, hash, rol_id])

    return nuevoRegistro
}

export default {create}