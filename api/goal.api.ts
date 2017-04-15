import {Router} from "express"
import {IGoal} from "../interfaces/IGoal"
import * as HttpStatus from 'http-status-codes'
import {Goal} from "../models/Goal"
import {Milestone} from "../models/Milestone"

export let goalApi: Router = Router()

goalApi.get('/', function (req, res, next) {
    Goal.find(function (err, goals) {
        if (err) return next(err)
        let retVal = goals.map(goal => <IGoal>goal.toJSON())
        res.send(retVal)
    })
})

goalApi.get('/:id', function (req, res, next) {
    Goal.findById(req.params.id, function (err, goal) {
        if (err) return next(err)
        if (!goal) return res.sendStatus(HttpStatus.NOT_FOUND)
        res.send(goal.toJSON())
    })
})

goalApi.post('/', function (req, res, next) {
    Goal.create(req.body, function (err, goal) {
        if (err) return next(err)
        res.send(goal)
    })
})

goalApi.put('/:id', function (req, res, next) {
    Goal.findByIdAndUpdate(req.body, {new: true, upsert: true}, function (err, goal) {
        if (err) return next(err)
        res.send(goal.toJSON())
    })
})

goalApi.delete('/:id', function (req, res, next) {
    Goal.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err)
        return res.sendStatus(HttpStatus.OK)
    })
})

let milestoneRouter = Router()
goalApi.use('/:goalId/milestones', milestoneRouter)

milestoneRouter.get('/', function (req, res, next) {
    Milestone.find({parentGoal: req.params.goalId}, function (err, milestones) {
        if (err) return next(err)
        let retVal = milestones.map(ms => ms.toJSON())
        res.send(retVal)
    })
})

milestoneRouter.get('/:id', function (req, res, next) {
    Milestone.findOne({id: req.params.id, parentGoal: req.params.goalId}, function (err, milestone) {
        if (err) return next(err)
        if (!milestone) return res.sendStatus(HttpStatus.NOT_FOUND)
        res.send(milestone.toJSON())
    })
})

milestoneRouter.post('/', function (req, res, next) {
    Milestone.createAsChild(req.params.goalId, req.body, function (err, milestone) {
        if (err) return next(err)
        res.send(milestone)
    })
})

milestoneRouter.put('/:id', function (req, res, next) {
    Milestone.updateAsChild({parentId: req.params.goalId, childId: req.params.milestoneId}, req.body, function (err, milestone) {
        if (err) return next(err)
        res.send(milestone)
    })
})

milestoneRouter.delete('/:id', function (req, res, next) {
    Milestone.findOneAndRemove({parentId: req.params.goalId, id: req.params.id}, function (err) {
        if (err) return next(err)
        res.sendStatus(HttpStatus.OK)
    })
})

