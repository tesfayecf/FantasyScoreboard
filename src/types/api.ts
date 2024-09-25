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

interface IndusPlayer extends Player {
    indusPoints: number;
    indusPosition: number;
}


type ConfigItem = {
    value: boolean | number | string | object | any[] | undefined;
    name: string;
    active: boolean;
};

type PremiumFeature = {
    name: string;
    available: boolean;
    comingSoon: boolean;
    order: number;
    editable: boolean;
};

type PremiumConfigurationAttribute = {
    name: string;
    initializable: boolean;
    editable: boolean;
    value?: number;
};

type PremiumConfiguration = {
    name: string;
    available: boolean;
    attributes: PremiumConfigurationAttribute[];
};

type LegalConditionVersion = {
    clientId: string;
    major: number;
    minor: number;
};

type Config = {
    value: boolean | number | string | object | {
        sponsorIds?: number[];
        premiumFeatures?: PremiumFeature[];
        premiumConfigurations?: PremiumConfiguration[];
        legalConditionsVersions?: LegalConditionVersion[];
        hoursBanInterval?: number;
    };
    name: string;
    active: boolean;
};

type ConfigList = Config[];
