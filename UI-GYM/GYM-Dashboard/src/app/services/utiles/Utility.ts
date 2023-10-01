import { Player } from "../services/interfaces/classification";

export const getDateSubtract = (player: Player): number => {
    const today = new Date();
    const dateModify = new Date(player?.dateModify);
    const num = getDaysFromSubtypeInfo(player);
    let diff = addDays(num, player?.dateModify).getTime() - today.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));    
    return days;
  }

export const addDays = (days: number, date: Date) => {
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    return date;
}

export const getDaysFromSubtypeInfo = (player: Player): number => {
    let num: number = 0;
    switch(player?.sysSubtype?.id) {
        case 1: num = 29; break;
        case 2: num = 29; break;
        case 3: num = 58; break;
        case 4: num = 87; break;
        case 5: num = 174; break;
        case 6: num = 360; break;
    }
    return num;
}

// no special chars ...
export const userNameOrEmailControl = (value: string): boolean => {
    const regexPattern = new RegExp(
      /[~`!#\\\/$%\^&*()+=@\-\[\]\\\s';,{}|\\":<>\?]/g
    ); //unacceptable chars
    if (regexPattern.test(value)) {
      return true;
    }
    return false;
  }
