import { db } from "../databases/DatabaseContext.js";
import * as sqlutils from "../utils/sqlTextos.js"

export const tableName = "esportes";

export async function Get ( req, res)  {
    try {
        const results = await db.execute(
            `SELECT * FROM ${tableName} ORDER BY id_esporte`
        );
        return {"message":"Success","data":results[0]} ;
    } catch (error) {
        console.log(error);
        return {"message": "error", "Error": error.message};
    }
}

export async function GetById(id_esporte){
    try {
        const results = await db.execute(
            `SELECT * FROM ${tableName} WHERE id_esporte = ? ORDER BY id_esporte `,
            [id_esporte]
        );
        return {"message":"Success","data":results[0]} ;
    } catch (error) {
       return {"message": "error", "Error": error.message} 
    }
}

export async function Delete(id_esporte){
    try {
        const results = await db.execute(
            `DELETE FROM ${tableName} WHERE id_esporte = ?`,
            [id_esporte]
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

export async function Put( data, id_esporte ){
    try {
        
        sqlutils.extrair_dados(data) ;
        const sqlSets = sqlutils.gerar_sqlSets();
        const sqlValuesParms = sqlutils.listParms() ;
        sqlValuesParms.push( id_esporte );

        const results= await db.execute(
            `UPDATE ${tableName} SET ${sqlSets} WHERE id_esporte = ?`,
            sqlValuesParms
        );
        return {"message":"Success","data":results} ;
    } catch (error) {
        return {"message": "error", "Error": error.message} 
    }
}