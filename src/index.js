import expres from 'express'
import {pool} from './db.js'
import {} from './config.js'
import bodyParser from 'body-parser'

const app = expres()
app.use(bodyParser.json())



app.post('/validarcodigo', async (req, res) => {
    try {
        const { codigo } = req.body
        const [result] = await pool.query('SELECT * FROM CodigoRegistro WHERE Codigo = ?', [codigo])

        if (result.length > 0) {
            res.json({ success: true, message: 'Código válido' })
        } else {
            res.json({ success: false, message: 'Código no encontrado' })
        }
    } catch (error) {
        console.error('Error:', error);  // Log de errores para más detalles
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message })

    }
})

app.get('/modelomonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Modelo FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

app.listen(3000)
console.log('server')
