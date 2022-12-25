import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor(
    private fileChooser: FileChooser
  ) { }

  ngOnInit() {
  }

  async upload() {

    this.fileChooser.open()
      .then(uri => console.log(uri))
      .catch(e => console.log(e));

    
  }

  
}
