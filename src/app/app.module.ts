import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpfsService } from './services/ipfs.service';
import { HomeComponent } from './home/home.component';
import { MintNFTComponent } from './mint-nft/mint-nft.component';
import { MyNftComponent } from './my-nft/my-nft.component';
import { SellNFTComponent } from './sell-nft/sell-nft.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MintNFTComponent,
    MyNftComponent,
    SellNFTComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [IpfsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
