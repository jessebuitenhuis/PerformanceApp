import {Component, OnInit} from "@angular/core"
import {Team, TeamResource} from "../resources/team.resource"
import {ActivatedRoute} from "@angular/router"
@Component({
    selector: 'team-detail',
    templateUrl: 'app/teams/team-detail.html'
})
export class TeamDetailComponent implements OnInit {
    team: Team;

    constructor(private _teamResource: TeamResource, private _route: ActivatedRoute) {}

    ngOnInit() {
        let id = this._route.snapshot.params.id;
        this._teamResource.get({id: id}).$observable.subscribe(team => this.team = team);
    }  
}