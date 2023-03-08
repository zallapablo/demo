import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async upload(event) {
    const file = event.target.file[0];

    console.log((file));
    
    
    
  }

  
}
