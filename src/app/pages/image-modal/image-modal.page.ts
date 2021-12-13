import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  @Input() source: any;

  background = null;

  constructor(private modalController: ModalController, private route: ActivatedRoute) {
 
  }

  ngOnInit(): void {
    this.background = {
      backgroundImage: `url(https://ggspace.nyc3.cdn.digitaloceanspaces.com/uploads/${this.source})`
      
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
