import config from './config';

export default class Api {
  private request(url: string, init: RequestInit): Promise<boolean> {
    return fetch(url, init).then((response) => {
      // return response.json();
      return true;
    }).catch(() => {throw new Error('making request failed');});
  }
  
  public getDoor() {
    // return this.request<boolean>(config.endpoint + 'getDoor', {
    //   method: 'GET',
    // });

    return new Promise<boolean>(() => {

    });
  }

  public setOpenDoor() {
    return this.request(config.endpoint + 'OpenDoor', {
      method: 'PUT',
    });
  }

  public setCloseDoor() {
    return this.request(config.endpoint + 'CloseDoor', {
      method: 'PUT',
    });
  }

  public getTrunk() {
    
  }
}
