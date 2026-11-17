import { db } from "../databases/DatabaseContext.js";
import * as sqlutils from "../utils/sqlTextos.js"

export const tableName = "instituicoes";

export async function Get ( req, res)  {
    try {
        const results = await db.execute(
            `SELECT * FROM ${tableName} ORDER BY id_instituicao`
        );
        return {"message":"Success","data":results[0]} ;
    } catch (error) {
        console.log(error);
        return {"message": "error", "Error": error.message};
    }
}

export async function GetById(id){
    try {
        const results = await db.execute(
            `SELECT * FROM ${tableName} WHERE id_instituicao = ? ORDER BY id_instituicao`,
            [id]
        );
        return {"message":"Success","data":results[0]} ;
    } catch (error) {
       return {"message": "error", "Error": error.message} 
    }
}

export async function GetByEmailSenha(email, senha){
    try {
        
        const results = await db.execute(
            `SELECT * FROM ${tableName} WHERE WHERE email = ? AND senha = ?`,
            [email, senha]
        );
        if (results[0].length === 0) {
          return {"message": "error", "Error": "resgistro não localizado"} 
        }            
        return {"message":"Success","data":results[0]} ;
    } catch (error) {
       return {"message": "error", "Error": error.message} 
    }
}

export async function Delete(id){
    try {
        const results = await db.execute(
            `DELETE FROM ${tableName} WHERE id_instituicao = ?`,
            [id]
        );
        return {"message":"Success","data":results} ;
    } catch (error) {
       return {"message": "error", "Error": error.message} 
    }
}

export async function Post( data ){
    try {
        
        const payload = data;
        sqlutils.extrair_dados( payload );
        const sqlFields = sqlutils.gerar_sqlFields();
        const sqlParms = sqlutils.gerar_sqlParams();
        const sqlValuesParms = sqlutils.listParms();  
        const sqlTexto = `INSERT INTO ${tableName} ( ${sqlFields} )  VALUES ( ${sqlParms} )`
        console.log( sqlTexto);

        const results = await db.execute( sqlTexto,  sqlValuesParms
        );
        return {"message":"Success","data":results} ;
    } catch (error) {
        return {"message": "error", "Error": error.message} 
    }

}

export async function Put( data, id ){
    try {
        
        sqlutils.extrair_dados(data) ;
        const sqlSets = sqlutils.gerar_sqlSets();
        const sqlValuesParms = sqlutils.listParms() ;
        sqlValuesParms.push( id );

        const results= await db.execute(
            `UPDATE ${tableName} SET ${sqlSets} WHERE id_instituicao = ?`,
            sqlValuesParms
        );
        return {"message":"Success","data":results} ;
    } catch (error) {
        return {"message": "error", "Error": error.message} 
    }
}