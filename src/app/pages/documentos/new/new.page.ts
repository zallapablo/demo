import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  tipo_doc: any;
  tipos_doc = ["", "Consentimiento Redes sociales y whatsapp", "Código de conducta", "Foto", "Justificante de pago", "Partida de bautismo", "Protección de datos", "Protocolo COVID", "Tarjeta sanitaria", "Título Coordinador", "Título Monitor", "DNI", "Tarjeta seguro privado", "Certificado negativo delitos sexuales"];
  descripcion: string;
  file: any;

  constructor() { }

  ngOnInit() {
  }
  

  async save() {

     
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);

    console.log(formData);
    

    /*
    this.http.post('https://example.com/upload', formData)
      .subscribe(response => {
        console.log('Archivo subido exitosamente');
      });
    */
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
