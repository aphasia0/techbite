import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dark-mode-switch',
  templateUrl: './dark-mode-switch.component.html',
  styleUrls: ['./dark-mode-switch.component.scss'],
  standalone: false
})
export class DarkModeSwitchComponent {

  call(state: boolean) {
    state ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }
}
