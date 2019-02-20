import {Injectable} from '@angular/core';
import {RecentGroupService} from "./recent-group.service";
import {Storage} from '@ionic/storage';
import {Group} from "./Group";

const STORAGE_KEY = 'allGroups';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(private storage: Storage, private recentGroupService: RecentGroupService) {}

    getAllGroups(): Promise<Group[]> {
        return this.storage.get(STORAGE_KEY);
    }

    addGroup(name: string): void {
        let newGroup = new Group(name);

        this.getAllGroups().then(result => {
            if (result) {
                result.push(newGroup);
                this.storage.set(STORAGE_KEY, result);
            } else {
                this.storage.set(STORAGE_KEY, [newGroup]);
            }
        });

        this.recentGroupService.addRecentGroup(newGroup);
    }

}
