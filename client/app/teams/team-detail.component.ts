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

    addUser() {
        this.newUser = '58e2b181af4c0c387b1e6931';
        this._teamResource.updateUser({id: this.teamId, userId: this.newUser}).$observable
            .subscribe(() => this.newUser = null, e => this.userError = e)

    }

    //TODO this 'any' bothers me
    removeUser(user: any) {
        this._teamResource.removeUser({id: this.teamId, userId: user._id}).$observable
            .subscribe(() => {
                var index = this.team.users.indexOf(user)
                if (index > -1) this.team.users.splice(index, 1)
            })
    }
}