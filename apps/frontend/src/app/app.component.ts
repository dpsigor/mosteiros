import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'mosteiros-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  msg = '';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ message: string }>(environment.apiUrl)
      // .pipe(take(1), map(cur => cur.message))
      .subscribe(res => this.msg = res.message);
  };
}
