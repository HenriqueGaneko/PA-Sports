// ============================================================
// usersControllers.js  —  camada de controle para "users"
// ============================================================
// O Controller fica ENTRE a Route e o Model.
// Responsabilidade dele:
//   1. Pegar os dados da requisição (req.body, req.params)
//   2. VALIDAR esses dados antes de repassar ao Model
//   3. Chamar o Model só com dados já validados e "limpos"
//   4. Devolver o resultado para a Route
//
// O Controller NÃO fala com o banco — isso é papel do Model.
// O Controller NÃO envia a resposta HTTP — isso é papel da Route.
// ============================================================

import * as myModel from "../model/usersModel.js"
import bcrypt from 'bcryptjs';

export function getTableName(){
    return myModel.tableName;
}

// metodo get = verbo get
export async function Get(req,res){
    try {
        const response = await myModel.Get();
        if (response.message.toLowerCase() == "success".toLowerCase() ) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
        
        
    } catch (error) {
        res.status(403).json({"message":"erro", "Error": error.message});
    }
}

export async function GetById(req,res) {
    try {
        const id = req.params.id;
        const response = await myModel.GetById(id);
        if (response.message.toLowerCase() == "success".toLowerCase() ) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
       res.status(403).json({"message":"erro", "Error": error.message});    
    }
}

export async function GetByEmail(req,res) {
    try {
        const email = req.params.email;
        const response = await myModel.GetByEmail(email);
        if (response.message.toLowerCase() == "success".toLowerCase() ) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
       res.status(403).json({"message":"erro", "Error": error.message});    
    }
}

export async function Delete(req,res) {
    try {
        const id = req.params.id;
        const response = await myModel.Delete(id);
        if (response.message.toLowerCase() == "success".toLowerCase() ) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
       res.status(403).json({"message":"erro", "Error": error.message});    
    }
}

export async function Post(req,res){
    try {
        const dataBody = req.body;

        if (!dataBody) {
            res.status(415).json({"message":"erro", "Error": "Dados não informados!..."});       
        }
        const { password } = dataBody;
        if ( password ){
            const hashedPassword = await bcrypt.hash(password, 10);
            dataBody.password = hashedPassword
        }

        const response = await myModel.Post(dataBody);
         if (response.message.toLowerCase() == "success".toLowerCase() ) {
            res.status(201).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
       res.status(405).json({"message":"erro", "Error": error.message});  
    }

}

export async function Put(req,res){
    try {
        const id = req.params.id;
        const dataBody = req.body;
        if ( id <= 0 ){
            res.status(416).json({"message":"erro", "Error": "Falha sem ID..."});       
        }
        if (!dataBody) {
            res.status(415).json({"message":"erro", "Error": "Falha sem Body..."});       
        }
        //
        const { password } = dataBody;
        if ( password ){
            const hashedPassword = await bcrypt.hash(password, 10);
            dataBody.password = hashedPassword
        }
        //
        const response = await myModel.Put(dataBody, id );
         if (response.message.toLowerCase() == "success".toLowerCase() ) {
            res.status(201).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
        res.status(406).json({"message":"erro", "Error": error.message});  
    }
}