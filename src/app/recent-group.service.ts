import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Group} from "./Group";

const STORAGE_KEY = 'recentGroups';

@Injectable({
    providedIn: 'root'
})
export class RecentGroupService {

    constructor(private storage: Storage) {}

    getRecentGroups(): Promise<Group[]> {
        return this.storage.get(STORAGE_KEY);
    }

    addRecentGroup(group: Group): void {
        this.getRecentGroups().then(result => {
            if (result) {
                result.push(group);
                this.storage.set(STORAGE_KEY, result);
            } else {
                this.storage.set(STORAGE_KEY, [group]);
            }
        });
    }

}
