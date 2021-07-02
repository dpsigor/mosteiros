import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  // GeneralService,
  MosteiroJ,
} from './general.service';
// import { FirestoreService } from './firestore.service';
import { LocalService } from './local.service';
// import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mosteiros-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // mosteiroSubs: Subscription | null = null;
  mosteiros: MosteiroJ[] = [];
  selectedMosteiros: MosteiroJ[] = [];
  queryInput = new FormControl('');

  constructor(
    // private serv: GeneralService,
    // private serv: FirestoreService,
    private serv: LocalService,
  ) {}

  ngOnInit(): void {
    this.mosteiros = this.serv.getMosteiros();
    this.selectedMosteiros = this.mosteiros;
    // this.mosteiroSubs = this.serv.mosteiros$.subscribe(ms => {
    //   this.mosteiros = ms;
    //   this.selectedMosteiros = ms;
    // });
    this.queryInput.valueChanges.subscribe(q => {
      const query = q.toLowerCase().replace(/\s/g, '');
      this.updateMosteiros(query);
    })
  };

  updateMosteiros(query: string) {
    this.selectedMosteiros = this.mosteiros.filter(m => query ? m.resumo.includes(query) : true);
  }

  ngOnDestroy() {
  //   if (this.mosteiroSubs) this.mosteiroSubs.unsubscribe();
  }
}
