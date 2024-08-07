 import { SECRET_KEY } from '../config/config.js';
 import jwt from 'jsonwebtoken'
import models from '../models/models.js';

 export const reports = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY)
   try {
    if (decoded.rol === 1 || decoded.rol === 2) {
        const resultado = await models.allReports()
        return res.json(resultado)
    } else {
        return res.json({message: 'credenciales invalidas'})
    }
   } catch (error) {
    res.status(500).json({message: error.message})
   }
}

export const myReports = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY)

    try {
        const id_user = decoded.usuario_id
        const resultado = await models.mReports(id_user)

        if (resultado.length === 0) return res.status(400).json({ message: 'No existen reportes relacionados usted' })

        res.json(resultado)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const newReport = async (req, res) => {
    try {
        const { section, description, location, img } = req.body 

        if (!section || !description || !location || !img ) {
            return res.status(400).json({ message: 'Datos faltantes' })
        }

        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY)
        const usuario_id = decoded.usuario_id

        const nuevoRegistro = await models.createReports( section, description, location, img, usuario_id)

        if (nuevoRegistro.affectedRows !== 1) {
            return res.status(400).json({ message: 'No se pudo enviar el reporte' })
        }

        res.json({ message: 'Reporte enviado' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteReport = async (req, res) => {
    const {report_id} = req.body

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'el token no existe' });
            }
    
            const decoded = jwt.verify(token, SECRET_KEY);
            const rol = decoded.rol;
    
            if (rol !== 1) {
                return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
            }
    
            const result = await models.eliminateReport(report_id);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Reporte no encontrado' });
            }
    
            res.json({ message: 'Reporte eliminado exitosamente' });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Token inválido' });
            }
            console.error('Error al eliminar reporte:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
}
