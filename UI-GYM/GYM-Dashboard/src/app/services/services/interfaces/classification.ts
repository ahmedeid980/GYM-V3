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
  sysExerciseType: string;
  sysGender: string;
  sysSubtype: string;
  weight: number;
  code?: number;
}

export interface Gender {
    id: number;
    gender: string;
    code: number;
  }