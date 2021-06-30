import { IMosteiro } from '@mosteiros/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService, MosteiroJ } from './general.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mosteiros-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  mosteiroSubs: Subscription | null = null;
  mosteiros: MosteiroJ[] = [];
  selectedMosteiros: MosteiroJ[] = [];
  queryInput = new FormControl('');

  constructor(private serv: GeneralService) {}

  ngOnInit(): void {
    this.mosteiroSubs = this.serv.getMosteirosListener().subscribe(ms => {
      this.mosteiros = ms;
      this.selectedMosteiros = ms;
    });
    this.serv.loadMosteiros();
    this.queryInput.valueChanges.subscribe(q => {
      const query = q.toLowerCase().replace(/\s/g, '');
      this.updateMosteiros(query);
    })
  };

  updateMosteiros(query: string) {
    this.selectedMosteiros = this.mosteiros.filter(m => query ? m.resumo.includes(query) : true);
  }

  ngOnDestroy() {
    if (this.mosteiroSubs) this.mosteiroSubs.unsubscribe();
  }
}
