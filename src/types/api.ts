interface Manager {
    id: string;
    managerName: string;
    avatar: string;
}

interface Team {
    managerWarned: boolean;
    id: string;
    manager: Manager;
    banned: boolean;
    teamValue: number;
    teamPoints: number;
    teamMoney: number | null;
    isAdmin: boolean;
}

interface Player {
    position: number;
    previousPosition: number;
    points: number;
    team: Team;
}
