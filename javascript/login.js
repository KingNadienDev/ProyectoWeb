const contenedor = document.querySelector(".contenedor");
const btnsignin = document.getElementById("btn-sign-in");
const btnsignup = document.getElementById("btn-sign-up");

btnsignin.addEventListener("click" ,()=>{
   contenedor.classList.remove("toggle");
});

btnsignup.addEventListener("click" ,()=>{
  contenedor.classList.add("toggle");
});

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Datos de conexión MySQL
const dbConfig = {
  host: 'databases.joanfo.dev',
  port: 3306,
  user: 'u3_Q3Jdye3Sfs',
  password: 'yqg3.Jws=mAQE@6O0cna6dv!',
  database: 's3_nadien',
};

// Conexión global (pool)
let pool;
async function initDb() {
  pool = await mysql.createPool(dbConfig);
}
initDb();

// Registro
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    // Verificar si ya existe el email
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Insertar usuario (sin hashing de contraseña para simplificar, recomiendo bcrypt)
    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

    res.json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const [rows] = await pool.query('SELECT id, name, password FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      // No existe el correo
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const user = rows[0];

    // Validar contraseña (sin hash para simplificar)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    res.json({ message: 'Login exitoso', name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
