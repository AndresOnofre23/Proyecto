import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sedeSchema = new Schema({

  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  descripcion: String,
  usuarioId: String,
  activo: {type: Boolean, default: true}

});

// Convertir a un modelo 
const Sede = mongoose.model('Sede', sedeSchema);

export default Sede;