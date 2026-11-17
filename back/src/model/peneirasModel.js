import { db } from "../databases/DatabaseContext.js";
import * as sqlutils from "../utils/sqlTextos.js"

export const tableName = "peneiras";

export async function Get(req, res) {
    try {
        const sqlText = `
        SELECT
        peneiras.id_peneira,
        peneiras.titulo,
        peneiras.descricao,
        peneiras.data_peneira,
        peneiras.localizacao,
        peneiras.vagas,
        esportes.nome_esporte,
        instituicoes.nome AS nome_instituicao
        FROM ${tableName}
        INNER JOIN esportes    ON peneiras.id_esporte     = esportes.id_esporte
        INNER JOIN instituicoes ON peneiras.id_instituicao = instituicoes.id_instituicao
        ORDER BY peneiras.id_peneira
        `;
        const results = await db.execute(sqlText);
        return { "message": "Success", "data": results[0] };
    } catch (error) {
        console.log(error);
        return { "message": "error", "Error": error.message };
    }
}

export async function GetById(id) {
    try {
        const sqlText = `
        SELECT
        peneiras.id_peneira,
        peneiras.titulo,
        peneiras.descricao,
        peneiras.data_peneira,
        peneiras.localizacao,
        peneiras.vagas,
        esportes.nome_esporte,
        instituicoes.nome AS nome_instituicao
        FROM ${tableName}
        INNER JOIN esportes    ON peneiras.id_esporte     = esportes.id_esporte
        INNER JOIN instituicoes ON peneiras.id_instituicao = instituicoes.id_instituicao
        WHERE peneiras.id_peneira = ?
        `;
        const results = await db.execute(sqlText, [id]);
        return { "message": "Success", "data": results[0] };
    } catch (error) {
        return { "message": "error", "Error": error.message }
    }
}


export async function Delete(id) {
    try {
        const results = await db.execute(
            `DELETE FROM ${tableName} WHERE id_peneira = ?`,
            [id]
        );
        return { "message": "Success", "data": results };
    } catch (error) {
        return { "message": "error", "Error": error.message }
    }
}

export async function Post(data) {
    try {
        const payload = data;
        sqlutils.extrair_dados(payload);
        const sqlFields = sqlutils.gerar_sqlFields();
        const sqlParms = sqlutils.gerar_sqlParams();
        const sqlValuesParms = sqlutils.listParms();
        const sqlTexto = `INSERT INTO ${tableName} ( ${sqlFields} )  VALUES ( ${sqlParms} )`
        console.log(sqlTexto);

        const results = await db.execute(sqlTexto, sqlValuesParms
        );
        return { "message": "Success", "data": results };
    } catch (error) {
        return { "message": "error", "Error": error.message }
    }

}

export async function Put(data, id) {
    try {

        sqlutils.extrair_dados(data);
        const sqlSets = sqlutils.gerar_sqlSets();
        const sqlValuesParms = sqlutils.listParms();
        sqlValuesParms.push(id);

        const results = await db.execute(
            `UPDATE ${tableName} SET ${sqlSets} WHERE id_peneira = ?`,
            sqlValuesParms
        );
        return { "message": "Success", "data": results };
    } catch (error) {
        return { "message": "error", "Error": error.message }
    }
}