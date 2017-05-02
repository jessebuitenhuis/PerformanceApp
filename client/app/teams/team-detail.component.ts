import {Component, OnInit} from "@angular/core"
import {Team, TeamResource} from "../resources/team.resource"
import {ActivatedRoute} from "@angular/router"
import {IUser} from "../../../interfaces/IUser"
@Component({
    selector: 'team-detail',
    templateUrl: 'app/teams/team-detail.html'
})
export class TeamDetailComponent implements OnInit {
    teamId: string;
    team: Team;
    newUser: string;
    userError: any;

    constructor(private _teamResource: TeamResource, private _route: ActivatedRoute) {}

    ngOnInit() {
        this.teamId = this._route.snapshot.params.id;
        this._teamResource.get({id: this.teamId}).$observable
            .subscribe(team => this.team = team);
    }

    public addUser() {
        // this.team.$setData({name:'bamz'})
        console.log(this.team);
     // this.team.sayHi()
        this.team.$addUser(this.newUser)
            .subscribe(() => this.newUser = null, e => this.userError = e)
    }

    // //TODO this 'any' bothers me
    // removeUser(user: any) {
    //     this._teamResource.removeUser().$observable
    //         .subscribe(this.getTeam())
    // }
}