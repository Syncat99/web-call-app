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

    console.log(user, found, "adding user");

    this.waiting.push({ ...user, language: user.language.toLocaleLowerCase() });

    if (!!found) {
      this.newCall([user.userId, found.userId]);
      return found;
    }

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
      ?.find(({ userId: id }) => id !== userId);

    if (user)
      return {
        status: "calling",
        ...user,
      };

    return null;
  }

  newCall(userStrings: [string, string]) {
    const users = userStrings
      .map((userId) => this.waiting.find(({ userId: id }) => id === userId))
      .filter((el) => !!el) as [WaitingUser, WaitingUser];

    this.calling.push(users);
    this.waiting = this.waiting.filter(
      ({ userId }) => userId !== users[0].userId && userId !== users[1].userId
    );
  }
}

let waiting: Waiting | null = null;
export const getWaiting = () => {
  if (!waiting) waiting = new Waiting();
  return waiting;
};
