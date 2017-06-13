/**
 * This model is only used to determine the user address location with navigator.geolocation
 * if the errorCode === 0, that means the user approved geolocation
 * if it equals 1 it mans the user desapproved geolocation
 * in the last case the position will be found using the ip address of the user
 */

export class UserLocation {
  
  latitude : number;
  longitude: number;
  errorCode: number;

  /**
   * 
   * @param props: object passed from navigator.geolocation.getCurrentPosition
   */
  constructor(props: Position | PositionError | null) {
    if(props['coords']) {
      this.latitude  = props['coords']['latitude'] ;
      this.longitude = props['coords']['longitude'];
      this.errorCode = 0;
    } else {
      this.latitude  = null;
      this.longitude = null;
      this.errorCode = props['code'] || 1;
    }
  }
}