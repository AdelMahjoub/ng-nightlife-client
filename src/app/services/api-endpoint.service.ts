import { Injectable } from '@angular/core';

@Injectable()
export class ApiEndPointService {

  baseUrl = '/api';

  constructor() { }

  getUrl(): string {
    return this.baseUrl;
  }
}