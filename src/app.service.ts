import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ABiService } from './abi.service';
import { AbiItem } from 'web3-utils';
import { AbiItemProps, data } from './contract-abi';



@Injectable()
export class AppService {
  
  private  web3: Web3;
  private readonly contractAddress = '0xdcc0f2d8f90fde85b10ac1c8ab57dc0ae946a543';
  private readonly contractABI: AbiItemProps[] = data;
  private  contract;
  private readonly apikey = 'UJQ9TEIECJHI8ZWM1KMQYRH8ENXKZ75T4M';
  private  txnHash = "0x543242f6b77417d826b784c6dba336c9765e10adf65954c855769c1a14afc68c";
  private fromNumber: BigInt;

  

  constructor(private readonly abiService: ABiService,) {
    this.web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/PHfwSF8C1wTEfBKsqP4tJkhAaKV99zQf');
    this.initializeContract();
    this.getBlockNumber()
    this.getTransferEvents()
  }

  private async initializeContract(): Promise<void> {
    try {
      this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      console.log('Contract initialized successfully');
    } catch (error) {
      console.error('Error initializing contract:', error.message);
    }
  }

  private async getBlockNumber(): Promise<void> {
    const creationBlock = await this.web3.eth.getTransactionReceipt(this.txnHash);
    this.fromNumber = creationBlock.blockNumber
  }

  async getTransferEvents(fromBlock: number = 0, toBlock: string = 'latest') {
    const a = await this.contract.getPastEvents('Transfer', {
      fromBlock: this.fromNumber,
      toBlock,
    });
  }

  

  async getMintEvents(fromBlock: number = 0, toBlock: number = 0) {
    return await this.contract.getPastEvents('Mint', {
      fromBlock,
      toBlock,
    });
  }

  async getContractCreationTx() {
    const txCount = await this.web3.eth.getTransactionCount(this.contractAddress);
    if (txCount < 1) {
      console.log('The contract was deployed in its first transaction.');
      return null;
    }
    const receipt = await this.web3.eth.getTransactionReceipt(this.contractAddress);
    return receipt.transactionHash;
  }
}

