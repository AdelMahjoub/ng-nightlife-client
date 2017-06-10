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