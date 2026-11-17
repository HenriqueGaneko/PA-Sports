import { db } from "../databases/DatabaseContext.js";
import * as sqlutils from "../utils/sqlTextos.js"

export const tableName = "inscricoes";

export async function Get(req, res) {
    try {
        const sqlText = `
        SELECT
            inscricoes.id_inscricao,
            inscricoes.data_inscricao,
            atletas.id_atleta,
            atletas.nome AS nome_atleta,
            atletas.email AS email_atleta,
            peneiras.id_peneira,
            peneiras.titulo AS titulo_peneira,
            peneiras.data_peneira,
            peneiras.localizacao
            FROM ${tableName}
            INNER JOIN atletas  ON inscricoes.id_atleta  = atletas.id_atleta
            INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
            ORDER BY inscricoes.id_inscricao
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
            inscricoes.id_inscricao,
            inscricoes.data_inscricao,
            atletas.id_atleta,
            atletas.nome AS nome_atleta,
            atletas.email AS email_atleta,
            peneiras.id_peneira,
            peneiras.titulo AS titulo_peneira,
            peneiras.data_peneira,
            peneiras.localizacao
            FROM ${tableName}
            INNER JOIN atletas  ON inscricoes.id_atleta  = atletas.id_atleta
            INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
            WHERE inscricoes.id_inscricao = ?
            ORDER BY inscricoes.id_inscricao
        `;
        const results = await db.execute(sqlText, [id]);
        return { "message": "Success", "data": results[0] };
    } catch (error) {
        return { "message": "error", "Error": error.message }
    }
}

export async function GetByAtleta(id_atleta) {
    try {
        const sqlText = `
        SELECT
        inscricoes.id_inscricao,
        inscricoes.data_inscricao,
        inscricoes.id_peneira,
        peneiras.titulo AS titulo_peneira,
        peneiras.data_peneira,
        peneiras.localizacao,
        peneiras.vagas
        FROM ${tableName}
        INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
        WHERE inscricoes.id_atleta = ?
        ORDER BY peneiras.data_peneira
        `;
        const results = await db.execute(sqlText, [id_atleta]);
        return { "message": "Success", "data": results[0] };
    } catch (error) {
        return { "message": "error", "Error": error.message }
    }
}

export async function GetByInscricoesDoUser(id) {
    try {
        const results = await db.execute(
            ` SELECT
	        c.title, c.duration
        FROM ${tableName} i
        INNER JOIN cursos c ON c.id = i.idcurso
        WHERE i.iduser = ?
        GROUP BY i.id
        ORDER BY i.id ASC
    `,
            [id],
        );
        return { message: "Success", data: results[0] };
    } catch (error) {
        return { message: "error", Error: error.message };
    }
}

export async function Delete(id) {
    try {
        const results = await db.execute(
            `DELETE FROM ${tableName} WHERE id_inscricao = ?`,
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
            `UPDATE ${tableName} SET ${sqlSets} WHERE id_inscricao = ?`,
            sqlValuesParms
        );
        return { "message": "Success", "data": results };
    } catch (error) {
        return { "message": "error", "Error": error.message }
    }
}