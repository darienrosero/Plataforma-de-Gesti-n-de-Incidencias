import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import models from '../models/models.js'

export const register = async (req, res) => {
    try {
        const {name, last_name, user_name, password, rol_id } = req.body

        if (!name || !last_name ||!user_name || !password || !rol_id) return res.status(400).json({ message: 'Datos faltantes' })

            const nuevoRegistro = await models.create(name, last_name, user_name, password, rol_id)

        if(nuevoRegistro.affectedRows !== 1 ) return res.status(400).json({message: 'no se puedo crear el registro'})

            res.json({message: 'usuario registrado' })

    } catch (error) {
        if (error?.errno === 1062) return res.status(400).json({message: 'El nombre de usuario ya existe'})
        return res.status(500).json({message: error.message})
    }
}