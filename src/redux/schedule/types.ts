export enum CoupleColorEnum {
  DEFAULT = '#d2cccc',
  BLUE = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(88, 97, 226, 0.698))',
  GREEN = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(55, 255, 0, 0.719))',
  RED = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(230, 57, 57, 0.883))'
}

export interface ICouple {
  id: string;
  subject: string;
  audience: string;
  lecturer: string;
  coupleColor: CoupleColorEnum;
}

export interface ScheduleState {
  couples: ICouple[];
}
