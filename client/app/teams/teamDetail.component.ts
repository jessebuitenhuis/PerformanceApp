import {Component, OnInit} from "@angular/core"
import {Team, TeamResource} from "../resources/team.resource"
import {ActivatedRoute} from "@angular/router"
import {User, UserResource} from "../resources/user.resource"
@Component({
    selector: 'team-detail',
    templateUrl: 'app/teams/team-detail.html'
})
export class TeamDetailComponent implements OnInit {
    teamId: string
    team: Team
    users: User[]
    newUser: string
    userError: any

    constructor(private _teamResource: TeamResource,
                private _userResource: UserResource,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.teamId = this._route.snapshot.params.id
        this.team = this._teamResource.get({id: this.teamId})
        this.users = this._userResource.query()
    }

    addUser() {
        this.team.$addUser(this.newUser)
            .$observable
            .subscribe(() => this.newUser = null, e => this.userError = e._body)
    }

    userIsSelected(user: User) {
        return this.team.users && this.team.users.some((item: User) => {
            return item.id === user.id
        })
    }
}