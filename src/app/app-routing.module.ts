import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MintNFTComponent } from './mint-nft/mint-nft.component';
import { MyNftComponent } from './my-nft/my-nft.component';
import { SellNFTComponent } from './sell-nft/sell-nft.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path : 'home', component : HomeComponent },
  { path: 'sell', component: SellNFTComponent},
  { path: 'mynfts', component: MyNftComponent},
  { path: 'mint', component: MintNFTComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
