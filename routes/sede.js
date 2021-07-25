import express from 'express';
const router = express.Router();

// importar el modelo nota
import Sede from '../models/sede';

const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion')

// Agregar una nota
router.post('/nueva-sede',verificarAuth, async(req, res) => {
  const body = req.body;  

  body.usuarioId = req.usuario._id;

  try {
    const sedeDB = await Sede.create(body);
    res.status(200).json(sedeDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con parámetros
router.get('/sede/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const sedeDB = await Sede.findOne({_id});
    res.json(sedeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/sede',verificarAuth, async(req, res) => {

  const usuarioId = req.usuario._id

  try {
    const sedeDB = await Sede.find({usuarioId});
    res.json(sedeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una nota
router.delete('/sede/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const sedeDB = await Sede.findByIdAndDelete({_id});
    if(!sedeDB){
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      })
    }
    res.json(sedeDB);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una nota
router.put('/sede/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const sedeDB = await Sede.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(sedeDB);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Exportación de router
module.exports = router;