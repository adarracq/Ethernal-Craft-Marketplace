import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { Injectable } from '@angular/core';


import {nftaddress, nftmarketaddress} from '../../../config';

import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../../artifacts/contracts/Market.sol/NFTMarket.json';
import { Router } from '@angular/router'
import { IpfsService } from '../services/ipfs.service';


@Injectable({
  providedIn: 'root'
})
export class MintService {

  constructor(private router : Router, private readonly ipfsService: IpfsService) { }

  fileUrl = null;
  formInput = { price: '', name: '', description: '' };


  createMarket = async () => {
    const { name, description, price } = this.formInput;
    if (!name || !description || !price || !this.fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: this.fileUrl
    })
    try {
      await this.ipfsService.start();
      const node = this.ipfsService.getIpfs();
      const added = await node.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      this.createSale(url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  createSale = async (url: any) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection); 
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(this.formInput.price, 'ether');

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice });
    await transaction.wait();
    this.router.navigate(['/']);
  }
}
