import express from 'express';
import { Producto } from './producto.js';

const app = express();
const PORT = 8080;
const objProductos = [];

const server = app.listen(PORT, () => {
    console.log(`Estas escuchando en el puerto: ${server.address().port}`);
});

server.on('ERROR', error => console.log(`Error en servidor: ${error}` ));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{

    res.send(
        `<h1 style="color:blue"> Bienvenidos al Servidor Express </h1>`
        );
});

app.get('/api/productos/listar', (req,res) => {
    let objError = {error : 'no hay productos cargados'};
    res.json(objProductos.length>0 ? objProductos : objError);
});


app.post('/api/productos/guardar', (req,res) => {
    try{
        let body = req.body;
        body.id = objProductos.length + 1;
        let prod = new Producto(body.id,body.tittle,body.price,body.thumbnail);
        objProductos.push(prod);
        res.json(objProductos);
    } catch {
        console.log('Error al obtener los productos del body');
        res.status(400).send('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
});

app.get('/api/productos/listar/:id', (req,res) => {
    let objError = {error : 'producto no encontrado'};
    try{
        let objFind = objProductos.find((e) => e.id == req.params.id);
        objFind ? res.json(objFind) : res.status(400).json(objError);
    } catch {
        console.log('Error. Id inexistente');
        res.status(400).json('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
});