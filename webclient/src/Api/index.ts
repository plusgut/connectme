import config from './config';

export default class Api {
  private request<responseType>(url: string, init: RequestInit): Promise<responseType> {
    return fetch(url, init).then((response) => {
      return response.json();
    }).catch(() => {throw new Error('making request failed');});
  }
  
  public getDoor() {
    return this.request<boolean>(config.endpoint + 'getDoor', {
      method: 'GET',
    });
  }

  public setOpenDoor() {
    return this.request<boolean>(config.endpoint + 'openDoor', {
      method: 'PUT',
    });
  }

  public setCloseDoor() {
    return this.request<boolean>(config.endpoint + 'closeDoor', {
      method: 'PUT',
    });
  }

  public getTrunk() {
    
  }
}
