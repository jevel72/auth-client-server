import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotifierService {
    public state: boolean = true;
    public subject = new BehaviorSubject(this.state);
    public notify$ = this.subject.asObservable();
    public changeState(): void {
        this.state = !this.state;
        this.subject.next(this.state);
    }
}