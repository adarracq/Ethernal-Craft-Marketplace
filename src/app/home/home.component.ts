import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loaded = false;
  empty = false;
  nfts : any;

  constructor(private homeService : HomeService) {
    //this.homeService.LoadNFTs();
   }

  async ngOnInit(): Promise<void> {
    await this.homeService.LoadNFTs();
    this.loaded = await this.homeService.loadingState;
    this.nfts = await this.homeService.nfts;

    if(this.nfts.lentgh == 0 || this.nfts.length == null) {
      this.empty = true;
    }


  }

}
