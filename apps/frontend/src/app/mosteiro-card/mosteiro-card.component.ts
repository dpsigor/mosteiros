import { Component, Input } from '@angular/core';
import { IMosteiro } from '@mosteiros/core';

@Component({
  selector: 'mosteiros-mosteiro-card',
  templateUrl: './mosteiro-card.component.html',
  styles: [
  ]
})
export class MosteiroCardComponent {
  @Input() mosteiro: IMosteiro | null = null;
  address: string = '';

  ngOnInit() {
    if (!this.mosteiro) return;
    const els: string[] = [];
    if (this.mosteiro.logradouro) els.push(this.mosteiro.logradouro);
    if (this.mosteiro.bairro) els.push(this.mosteiro.bairro);
    if (this.mosteiro.cidade) els.push(this.mosteiro.cidade);
    if (this.mosteiro.uf) els.push(this.mosteiro.uf);
    if (this.mosteiro.cep) els.push(this.mosteiro.cep);
    this.address = els.join(', ');
  }
}
