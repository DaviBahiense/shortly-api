import { connection } from '../database.js';
import { v4 as uuid } from 'uuid';

export async function createShorten(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    const { url } = req.body

    if (!token) {
        return res.sendStatus(401);
    } 

    const aleatory = uuid();
    const short = aleatory.slice(0,8)
    
    try {
        const row = await connection.query(`
        SELECT sessions."userId" FROM sessions 
        WHERE "token"=$1
        `,[token])
        const id = row.rows[0].userId

        await connection.query(`
        INSERT INTO 
            urls("userId", "shortUrl", url) 
        VALUES ($1, $2, $3)
    `, [id, short, url])

    res.send({
        shortUrl: short
    })
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getShorten(req, res) {
    const shortUrl = req.params.shortUrl

    try {
        const row = await connection.query(`
        SELECT u.id, u."shortUrl", u.url FROM urls u
        WHERE "shortUrl"=$1
        `,[shortUrl])

        if (row.rowCount === 0) {
            return res.sendStatus(401)
        }

        const short = row.rows[0]
        res.send(short)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
