import expres from 'express'
import {pool} from './db.js'
import {} from './config.js'
import bodyParser from 'body-parser'

const app = expres()
app.use(bodyParser.json())



app.get('/validarcodigo/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params
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

app.post('/crearusuario', async(req, res) => {
  try
  {
      const { usuario, contraseña, nombre, email, rol } = req.body
      const [result] = await pool.query('INSERT INTO Usuarios (Nombre, Usuario, Email, Contraseña, Rol) VALUES (?,?,?,?,?)', [nombre, usuario, email, contraseña, rol])
      res.json({ success: true, message: 'Usuario creado exitosamente', id: result.insertId})
  }
  catch (error)
  {
      console.error('Error:', error);  // Log de errores para más detalles
      res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
  }
})

app.put('/usarcodigo/:codigo', async(req, res) => {
  try
  {
      const { codigo } = req.params
      const estatus = "Ok"
      const [result] = await pool.query('UPDATE CodigoRegistro SET StatusCodigo = ? WHERE Codigo = ?',[estatus, codigo])
      res.json({success: true, message: "Codigo usado"})
  } catch(error)
  {
    console.error('Error:', error);  // Log de errores para más detalles
    res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
  }
})

app.post('/usarcodigo', async (req, res) => {
  try
  {
      const {codigo, estatus } = req.body
      const [result] = await pool.query('INSERT INTO CodigoRegistro (Codigo, StatusCodigo) VALU]ES (?,?)', [codigo, estatus])
  }
  catch (error)
  {
    console.error('Error:', error);  // Log de errores para más detalles
    res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
  }
})

app.get('/modelomonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Modelo) FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/ubicacionmonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Ubicacion) FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/statusmonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Estatus) FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/liquidadomonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Liquidado) FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })


  app.get('/clientemonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Cliente) FROM Montacargas')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/modelotractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Modelo) FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/ubicaciontractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Ubicacion) FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/statustractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Estatus) FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/clientetractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Cliente) FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/liquidadotractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Liquidado) FROM Tractores')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.post('/ejecutarmonta', async(req, res) =>
  {
    const { query } = req.body
    try
    {
        const [resultados] = await pool.query(query)
        res.json(resultados)
    }
    catch (error)
    {
        console.error('Error al ejecutar query', error)
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
    }
  })

app.listen(3000)
console.log('server')
