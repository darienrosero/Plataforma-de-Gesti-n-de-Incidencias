import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import models from '../models/models.js'

export const register = async (req, res) => {
    try {
        const { name, last_name, user_name, password, rol_id, departamento } = req.body

        if (!name || !last_name || !user_name || !password || !rol_id || !departamento) return res.status(400).json({ message: 'Datos faltantes' })

        const nuevoRegistro = await models.create(name, last_name, user_name, password, rol_id, departamento)

        if (nuevoRegistro.affectedRows !== 1) return res.status(400).json({ message: 'no se puedo crear el registro' })

        res.json({ message: 'usuario registrado' })

    } catch (error) {
        if (error?.errno === 1062) return res.status(400).json({ message: 'El nombre de usuario ya existe' })
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { user_name, password } = req.body
        const resultado = await models.login('user_name', user_name)

        if (resultado.length === 0) return res.status(400).json({ message: 'No se puede iniciar secion, falta el usuario o la contraseña' })

        const user = resultado[0]

        const math = await bcrypt.compare(password, user.password)

        if (!math) return res.status(400).json({ message: 'El nombre de usuario o contraseña son incorrectos' })

        const token = jwt.sign({ usuario_id: user.user_id, rol: user.rol_id }, SECRET_KEY, { expiresIn: '60m' })
        res.json({ message: 'usuario autenticado', token })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}