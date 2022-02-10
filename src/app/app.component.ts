import { Component, OnInit } from '@angular/core';

import { IpfsService } from './services/ipfs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileUrl = null;
  formInput = { price: '', name: '', description: '' };

  constructor(private readonly ipfsService: IpfsService) {}


  loadFile = async (e: any) => {
    const file = e.target.files[0];
    try {
      await this.ipfsService.start();
      const node = this.ipfsService.getIpfs();

      const added = await node.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url);
      this.fileUrl = url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  updateName(e: any) {
    this.formInput.name = e.target.value;
  }

  updateDescription(e: any) {
    this.formInput.description = e.target.value;
  }

  updatePrice(e: any) {
    this.formInput.price = e.target.value;
  }

}
