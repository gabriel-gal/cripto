"use server"

const options = {
    method: 'GET', headers: {
        accept: 'application/json', 'x-cg-demo-api-key': ' CG-MTEfQTevqCEAmzsGffrPsgqf '
    }
};

export async function getAllCripto() {
    try {
        const resp = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl', options)
        const data = await resp.json()

        return resp.status == 200 ? data : undefined

    } catch (err: unknown) {
        return undefined
    }
}

export async function getCripto(id: string) {
    try {
        const resp = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${id}`, options)
        const data = await resp.json()

        return resp.status == 200 ? data : undefined

    } catch (err: unknown) {
        return undefined
    }
}


export async function getGraficoCripto( id : string, day : string) {
    try {
        const resp = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=brl&days=${day}`, options)
        const data = await resp.json()

        return resp.status == 200 ? data : undefined

    } catch (err: unknown) {
        return undefined
    }
}