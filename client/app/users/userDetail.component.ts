import {Component, OnInit} from "@angular/core"
import {User, UserResource} from "../resources/user.resource"
import {ActivatedRoute} from "@angular/router"
import {Team, TeamResource} from "../resources/team.resource"
import {ITeam} from "../../../interfaces/ITeam"
@Component({
    selector: 'user-detail',
    templateUrl: '/app/users/user-detail.html'
})
export class UserDetailComponent implements OnInit {
    userId: number
    user: User
    teams: ITeam[]
    availableTeams: ITeam[]
    newTeam: number

    constructor(private _userResource: UserResource,
                private _teamResource: TeamResource,
                private _route: ActivatedRoute) {}

    ngOnInit() {
        this.userId = this._route.snapshot.params.id
        this.user = this._userResource.get({id: this.userId})
        this.availableTeams = this._teamResource.query()
        this.getTeams()
    }

    getTeams() {
        this.teams = this._userResource.queryTeams({id: this.userId})
    }

    addToTeam() {
        this._teamResource.addUser({id: this.newTeam, userId: this.user._id}, () => this.getTeams())
    }

    removeFromTeam(teamId: number) {
        this._teamResource.removeUser({id: teamId, userId: this.user._id}, () => this.getTeams())
    }

    teamIsSelected(team: Team) {
        return this.teams && this.teams.some(function(item){
            return team._id === item.id
        })
    }
}