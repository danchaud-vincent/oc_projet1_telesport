import { Component, Input } from '@angular/core';
import { keyDataHeader } from '../../models/key-data-header';

@Component({
  selector: 'app-key-data-header',
  standalone: true,
  imports: [],
  templateUrl: './key-data-header.component.html',
  styleUrl: './key-data-header.component.scss'
})
export class KeyDataHeaderComponent {

  @Input() keyData: keyDataHeader = { title: "", values: []};
}
