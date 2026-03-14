import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-dark-mode-switch',
  standalone: true,
  imports: [FormsModule, NzSwitchModule],
  templateUrl: './dark-mode-switch.component.html',
  styleUrls: ['./dark-mode-switch.component.scss'],
})
export class DarkModeSwitchComponent {

  call(state: boolean) {
    state ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }
}
