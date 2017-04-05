import {Router} from "express"
import {PersonalGoal} from "../models/PersonalGoal"
import {IGoal} from "../interfaces/IGoal"
import * as HttpStatus from 'http-status-codes'
import {Milestone} from "../models/Milestone"
import {expressionType} from "@angular/compiler/src/output/output_ast"
import {Goal, IGoalModel} from "../models/Goal"

export let goalApi: Router = Router()

goalApi.get('/', function (req, res, next) {
    PersonalGoal.find(function (err, goals) {
        if (err) return next(err)
        let retVal = goals.map(goal => <IGoal>goal.toJSON())
        res.send(retVal)
    })
})

goalApi.get('/:id', function (req, res, next) {
    PersonalGoal.findById(req.params.id, function (err, goal) {
        if (err) return next(err)
        if (!goal) return res.sendStatus(HttpStatus.NOT_FOUND)
        res.send(goal.toJSON())
    })
})

goalApi.post('/', function (req, res, next) {
    PersonalGoal.create(req.body, function (err, goal) {
        if (err) return next(err)
        res.send(goal)
    })
})

goalApi.put('/:id', function (req, res, next) {
    PersonalGoal.findByIdAndUpdate(req.body, {new: true, upsert: true}, function (err, goal) {
        if (err) return next(err)
        res.send(goal.toJSON())
    })
})

goalApi.delete('/:id', function (req, res, next) {
    PersonalGoal.findByIdAndRemove(req.params.id, function (err) {
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