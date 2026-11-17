// ============================================================
// usersRoutes.js  —  rotas HTTP para "users"
// ============================================================
// A Route é a camada mais externa da API.
// Responsabilidade dela:
//   1. Definir qual URL + método HTTP aciona qual função
//   2. Chamar o Controller passando req e res
//   3. Enviar a resposta HTTP ao cliente (res.status().json())
//
// Fluxo completo:
//   Cliente → Route → Controller → Model → Banco de dados
//                ←           ←         ←
// ============================================================

import { Router } from "express";
import * as mycontroller from "../controller/usersController.js"

const pointName = mycontroller.getTableName() || 'users';

const endPoint = `/${pointName}`;

const router = Router();

router.get( `${endPoint}`, (req,res)=>{ mycontroller.Get(req,res) });
router.get( `${endPoint}/:id`, (req,res)=>{ mycontroller.GetById(req,res) });
router.get( `${endPoint}/email/:email`, (req,res)=>{ mycontroller.GetByEmail(req,res) });

router.delete( `${endPoint}/:id`, (req,res)=>{ mycontroller.Delete(req,res) });
router.post(`${endPoint}`,(req,res) => { mycontroller.Post(req,res)});
router.put(`${endPoint}/:id`, (req,res) => { mycontroller.Put(req,res)} );
export default router;