import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MosteiroJ } from './general.service';
import { IMosteiro } from '@mosteiros/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // mosteiroCollection: AngularFirestoreCollection<IMosteiro>;
  // mosteiros$: Observable<MosteiroJ[]>;

  // constructor(private afs : AngularFirestore) {
  //   this.mosteiroCollection = this.afs.collection('mosteiros',
  //                                                 // ref => ref.limit(1)
  //                                                );
  //   this.mosteiros$ = this.mosteiroCollection.valueChanges().pipe(
  //     map(ms => ms.map(this.fillResumo)),
  //   );
  // }

  // fillResumo(m: IMosteiro): MosteiroJ {
  //   let resumo = '';
  //   resumo += m.nome;
  //   resumo += m.logradouro;
  //   resumo += m.bairro;
  //   resumo += m.cidade;
  //   resumo += m.uf;
  //   resumo += m.cep;
  //   resumo = resumo.replace(/\s/g, '').toLowerCase();
  //   return { ...m, resumo };
  // }
}
