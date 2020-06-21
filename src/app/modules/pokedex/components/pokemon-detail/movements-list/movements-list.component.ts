import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.scss'],
})
export class MovementsListComponent implements OnInit {
  @Input() moves: string[];

  constructor(private _modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this._modalController.dismiss({
      dismissed: true,
    });
  }
}
