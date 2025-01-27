import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
  email = '';

  constructor(private socket: Socket) {}

  ngOnInit() {
    // this.socket.on('connect', () => {});
  }

  onSubmit() {
    // this.socket.on('connect', () => {});
  }

  ngOnDestroy() {
    this.socket.on('disconnect', () => {});
  }

  logIn(email: string) {
    this.socket.emit(email);
  }
}
