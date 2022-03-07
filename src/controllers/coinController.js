const { default: axios } = require('axios');
const express = require('express');
const api = require('../api/api')

const Coin = require('../models/coin');

const router = express.Router();

async function typeCoin(x) {
    const data = await Coin.findOne({ code: x });
    return data;
}

router.post('/register', async (req, res) => {
    const { code } = req.body;
    try {
        if (await Coin.findOne({ code }))
            return res.status(400).send({ error: 'Coin already exist' })

        const user = await Coin.create(req.body);

        return res.status(200).send(user);
    } catch (error) {

        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const data = await Coin.find();
        return res.status(200).send(data);
    } catch (err) {
        return res.status(400).send(err)
    }
});

router.delete('', async (req, res) => {
    try {
        const id = req.body.id;
        Coin.findByIdAndRemove(id).exec();
    } catch {
        return res.status(400).send(err)
    } ' '
});

router.get('/convert', async (req, res) => {
    const from = req.query.from
    const to = req.query.to
    const amount = req.query.amount
    try {
        if (!(await Coin.findOne({ code: from }) && await Coin.findOne({ code: to })))
            return res.status(400).send({ error: 'Coin not already exist' })
        const toData = await typeCoin(to)
        const fromData = await typeCoin(from)
        if (toData.real == false) {
            if (fromData.real == false) {
                const amountFinal = ((toData.value / fromData.value) * amount)
                return res.status(200).send({ "amount": `${toData.symbol} ${amountFinal}` })
            } else {
                if (from == "BRL") {
                    return res.status(200).send({ "amount": `${toData.symbol} ${(toData.value * amount).toFixed(4)}` })
                } else {
                    await api.get(`price?fsym=${from}&tsyms=BRL`).
                        then((resp) => {
                            const r = resp.data
                            const amountFinal = ((toData.value * r["BRL"]) * amount)
                            return res.status(200).send({ "amount": `${toData.symbol} ${(amountFinal * amount).toFixed(4)}` })
                        })
                        .catch((err) => {
                            return res.status(400).json(err)
                        })
                }
            }
        } else if (fromData.real == false) {
            if (to == "BRL") {
                const amountFinal = (amount / fromData.value)
                return res.status(200).send({ "amount": `${toData.symbol} ${(amountFinal).toFixed(4)}` })
            } else {
                await api.get(`price?fsym=${to}&tsyms=BRL`).
                    then((resp) => {
                        const r = resp.data
                        const amountFinal = ((r["BRL"] / fromData.value) * amount)
                        return res.status(200).send({ "amount": `${toData.symbol} ${(amountFinal * amount).toFixed(4)}` })
                    })
                    .catch((err) => {
                        return res.status(400).json(err)
                    })
            }
        } else {
            await api.get(`price?fsym=${from}&tsyms=${to}`).
                then((resp) => {
                    const r = resp.data
                    const amountFinal = r[to]
                    return res.status(200).send({ "amount": `${toData.symbol}${(amountFinal * amount).toFixed(4)}` })
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        }
    } catch (err) {
        return res.status(400).json(err)
    }
})


module.exports = app => app.use('/coin', router);

