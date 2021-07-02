import { Component, OnInit } from '@angular/core';
import { LocalService } from './local.service';
import { FormControl } from '@angular/forms';
import { MosteiroJ } from '@mosteiros/core';

@Component({
  selector: 'mosteiros-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  mosteiros: MosteiroJ[] = [];
  selectedMosteiros: MosteiroJ[] = [];
  queryInput = new FormControl('');

  constructor(
    private serv: LocalService,
  ) {}

  ngOnInit(): void {
    this.mosteiros = this.serv.getMosteiros();
    this.selectedMosteiros = this.mosteiros;
    this.queryInput.valueChanges.subscribe(q => {
      const query = q.toLowerCase().replace(/\s/g, '');
      this.updateMosteiros(query);
    })
  };

  updateMosteiros(query: string) {
    this.selectedMosteiros = this.mosteiros.filter(m => query ? m.resumo.includes(query) : true);
  }
}
