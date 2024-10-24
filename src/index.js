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

  app.get('/ubicacionmonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Ubicacion FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/statusmonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Estatus FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/liquidadomonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Liquidado FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })


  app.get('/clientemonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Modelo FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/modelotractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Modelo FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/ubicaciontractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Ubicacion FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/statustractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Estatus FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/clientetractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Cliente FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/liquidadotractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT Id, Liquidado FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

app.listen(3000)
console.log('server')
