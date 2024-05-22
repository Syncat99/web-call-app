export interface WaitingUser {
  userId: string;
  language: string;
  peerId: string;
}

export class Waiting {
  waiting: WaitingUser[] = [];
  calling: [WaitingUser, WaitingUser][] = [];

  addUser(user: WaitingUser) {
    const found = this.waiting.find(
      ({ language }) => language === user.language
    );
    if (!!found) {
      this.waiting = this.waiting.filter((el) => el.userId === found.userId);
      this.calling.push([found, user]);
      return found;
    }

    this.waiting.push({ ...user, language: user.language.toLocaleLowerCase() });
    return null;
  }

  getUser(userId: string) {
    let user = this.waiting.find(({ userId: id }) => id === userId);
    if (user)
      return {
        status: "waiting",
        ...user,
      };

    user = this.calling
      .find(
        ([{ userId: id1 }, { userId: id2 }]) => id1 === userId || id2 === userId
      )
      ?.filter(({ userId: id }) => id === userId)?.[0];

    if (user)
      return {
        status: "calling",
        ...user,
      };

    return null;
  }
}

let waiting: Waiting | null = null;
export const getWaiting = () => {
  if (!waiting) waiting = new Waiting();
  return waiting;
};
