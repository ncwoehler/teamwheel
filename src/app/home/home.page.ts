import {Component, OnInit} from '@angular/core';

import {Group} from "../Group";
import {GroupService} from "../group.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    recentGroups: Group[];

    constructor(private groupService: GroupService) {}

    ngOnInit() {
        this.getRecentGroups();
    }

    getRecentGroups(): void {
        this.groupService.getRecentGroups()
            .subscribe(recent => this.recentGroups = recent);
    }

}
