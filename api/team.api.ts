import {Router} from "express"
import {Team} from "../models/Team"
import * as HttpStatusCode from 'http-status-codes'
import {IMongooseDocument} from "mongoose-decorators-ts"

export let teamApi = Router()

teamApi.get('/', function (req, res, next) {
    Team.find({}, function (err, teams) {
        if (err) return next(err)
        teams = <any> teams.map(team => team.toJSON())
        res.send(teams)
    })
})

teamApi.get('/:id', function (req, res, next) {
    Team.findById(req.params.id, function (err, team) {
        if (err) return next(err)
        if (!team) res.status(HttpStatusCode.NOT_FOUND).send('Team with given id not found.')
        res.send(team.toJSON())
    })
})

teamApi.post('/', function (req, res, next) {
    Team.create(req.body, function (err, team : IMongooseDocument<Team>) {
        if (err) return next(err)
        res.send(team.toJSON())
    })
})

teamApi.put('/:id', function (req, res, next) {
    Team.findByIdAndUpdate(req.params.id, req.body, {'new': true, upsert: true}, function (err, team) {
        if (err) return next(err)
        res.send(team)
    })
})

teamApi.delete('/:id', function (req, res, next) {
    Team.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err)
        res.status(HttpStatusCode.OK).send()
    })
})