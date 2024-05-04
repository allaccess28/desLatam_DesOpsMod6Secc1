import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();
const __dirname = path.resolve();

const fecha = new Date();
const dia = ("0" + fecha.getDate()).slice(-2);
const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
const anio = fecha.getFullYear();
const fechaFormateada = `${dia}/${mes}/${anio}`;

router.get("/", (req, res)=>{
    res.sendFile( __dirname + "/index.html")
})

router.get("/crear", (req, res)=>{
    const { archivo, contenido } = req.query
    fs.writeFile(archivo, contenido, ()=>{
        const nuevoContenido = fechaFormateada + " " + contenido
        fs.writeFile(archivo, nuevoContenido, ()=>{
            res.send(`Archivo creado con exito`)
        })
        
    });
});

router.get("/leer", (req,res)=>{
    const { archivo } = req.query;
    fs.readFile(archivo, (err, data)=>{
        res.sendFile(__dirname + `/${archivo}`)
    });
});

router.get("/renombrar", (req,res)=>{
    const { nombre }= req.query
    const nNombre = 'nuevoNombre'
    fs.rename( nombre, nNombre, (err, data)=>{
        res.send(`Archivo ${nombre} renombrado por ${nNombre}`)
    })
})

router.get("/eliminar", (req,res)=>{
    const { archivo }= req.query
    fs.unlink(archivo, (err,data)=>{
        res.send(`Archivo ${archivo} eliminado con exito`)
    })
})

export default router;