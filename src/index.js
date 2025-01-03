import expres from 'express'
import {pool} from './db.js'
import {} from './config.js'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'


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
      const hash= await bcrypt.hash(contraseña,10)
      const [result] = await pool.query('INSERT INTO Usuarios (Nombre, Usuario, Email, Contraseña, Rol) VALUES (?,?,?,?,?)', [nombre, usuario, email, hash, rol])
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

app.post('/iniciarsesion', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE Usuario = ?', [usuario]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(contraseña, user.Contraseña);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
    res.json({ success: true, message: 'Inicio de sesión exitoso', userId: user.id });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
  }
})

app.post('/usarcodigo', async (req, res) => {
  try
  {
      const {codigo, estatus } = req.body
      const [result] = await pool.query('INSERT INTO CodigoRegistro (Codigo, StatusCodigo) VALUES (?,?)', [codigo, estatus])
  }
  catch (error)
  {
    console.error('Error:', error);  // Log de errores para más detalles
    res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
  }
})

app.get('/modelomonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Modelo) FROM Montacargas ORDER BY Modelo')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/ubicacionmonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Ubicacion) FROM Montacargas ORDER BY Ubicacion')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/statusmonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Estado) FROM Montacargas ORDER BY Estado')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/liquidadomonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Liquidado) FROM Montacargas ORDER BY Liquidado')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })


  app.get('/clientemonta', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Cliente) FROM Montacargas ORDER BY Cliente')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/modelotractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Modelo) FROM Tractores ORDER BY Modelo')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/ubicaciontractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Ubicacion) FROM Tractores ORDER BY Ubicacion')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/statustractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Estado) FROM Tractores ORDER BY Estado')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/clientetractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Cliente) FROM Tractores ORDER BY Cliente')
      res.json(rows)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      res.status(500).json({ message: 'Error en el servidor' })
    }
  })

  app.get('/liquidadotractor', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT DISTINCT(Liquidado) FROM Tractores ORDER BY Liquidado')
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
