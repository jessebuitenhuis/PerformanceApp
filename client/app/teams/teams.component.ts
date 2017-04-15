import {Component, OnInit} from '@angular/core'
import {Team, TeamResource} from "../resources/team.resource"
import {ITeam} from "../../../interfaces/ITeam"
import {ResourceModel} from "ng2-resource-rest"

@Component({
    selector: 'teams',
    templateUrl: 'app/teams/teams.html'
})
export class TeamsComponent implements OnInit {
    teams: Team[]
    newTeam : Team;
    formError: string;

    constructor(private _teamResource: TeamResource) {
    }

    ngOnInit() {
        this.newTeam = <Team>this._teamResource.createModel();
        this.teams = this._teamResource.query()
    }

    create() {
        let _this = this;

        this.newTeam.$save().$observable
            .subscribe(function (result) {
                _this.newTeam = <Team>_this._teamResource.createModel()
                if (result) _this.teams.push(result)
            }, e => this.formError = e)
    }
}
