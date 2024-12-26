import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AbiItem } from 'web3-utils'; // Use AbiItem for ABI types if you're using Web3



@Injectable()
export class ABiService {
    constructor(private readonly httpService: HttpService) {}

    async getAbi(contractAddress: string, apiKey: string): Promise<AbiItem[]> {
        const url = 'https://api.fraxscan.com/api';
        const params = {
          module: 'contract',
          action: 'getabi',
          address: contractAddress,
          apikey: apiKey,
        };
    
        try {
          const response = await lastValueFrom(
            this.httpService.get(url, { params })
          );
          const abi: AbiItem[] = JSON.parse(response.data.result);
          const filterAbi = abi.filter((a:any) => a.name === 'Transfer' || a.name === 'Mint')
          console.log(filterAbi)
          const data = filterAbi.map((item:any) => item.inputs)
          console.log(data)
          return abi
        } catch (error) {
          console.error('Error fetching ABI:', error.message);
          throw error;
        }
      }
}