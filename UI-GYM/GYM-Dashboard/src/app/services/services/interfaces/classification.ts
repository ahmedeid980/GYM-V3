export interface Player {
  address: string;
  age: number;
  amountPaid: number;
  amountRest: number;
  cardNumber: number;
  height: number;
  id: number;
  passportNumber: number;
  phone: string;
  playerChampionships: string;
  playerName: string;
  sysExerciseType: any;
  dateModify: Date;
  sysGender: any;
  sysSubtype: any;
  weight: number;
  code?: number;
  subscriptionNo: number;
}

export interface Gender {
    id: number;
    gender: string;
    code: number;
  }