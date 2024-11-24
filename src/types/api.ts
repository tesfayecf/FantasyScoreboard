export interface Manager {
    id: string;
    managerName: string;
    avatar: string;
}

export interface Team {
    managerWarned: boolean;
    id: string;
    manager: Manager;
    banned: boolean;
    teamValue: number;
    teamPoints: number;
    teamMoney: number | null;
    isAdmin: boolean;
}

export interface Player {
    position: number;
    previousPosition: number;
    points: number;
    team: Team;
}

export interface IndusPlayer extends Player {
    indusPoints: number;
    indusPosition: number;
}


export type ConfigItem = {
    value: boolean | number | string | object | any[] | undefined;
    name: string;
    active: boolean;
};

export type PremiumFeature = {
    name: string;
    available: boolean;
    comingSoon: boolean;
    order: number;
    editable: boolean;
};

export type PremiumConfigurationAttribute = {
    name: string;
    initializable: boolean;
    editable: boolean;
    value?: number;
};

export type PremiumConfiguration = {
    name: string;
    available: boolean;
    attributes: PremiumConfigurationAttribute[];
};

export type LegalConditionVersion = {
    clientId: string;
    major: number;
    minor: number;
};

export type Config = {
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

export type ConfigList = Config[];


export interface MarketPlayer {
    discr: 'marketPlayerLeague';
    playerMaster: {
        images: {
            big: Record<string, unknown>;
            beat: Record<string, unknown>;
            transparent: Record<string, unknown>;
        };
        id: string;
        team: {
            badgeColor: string;
            badgeGray: string;
            badgeWhite: string;
            name: string;
            id: string;
            shortName: string;
            slug: string;
        };
        name: string;
        lastSeasonPoints: number;
        nickname: string;
        slug: string;
        positionId: number;
        position: string;
        marketValue: number;
        playerStatus: string;
        points: number;
        averagePoints: number;
    };
    id: string;
    salePrice: number;
    expirationDate: string; // ISO 8601 format
    status: 'on_sale' | 'sold' | 'expired'; // Add other possible statuses if any
    leagueType: 'private' | 'public'; // Add other types if any
    leagueId: number;
    numberOfBids: number;
};

export interface PlayerData {
    marketValueHistory: MarketValue[];
    stats: PlayerStats;
}

export interface MarketValue {
    bids: number;
    date: string; // ISO 8601 format date string
    lfpId: number;
    marketValue: number;
};

export interface PlayerStats {
    points: number;
    weekPoints: number;
    averagePoints: number;
    images: {
        big: Record<string, string>;
        beat: Record<string, string>;
        transparent: Record<string, string>;
    };
    id: string;
    team: {
        badgeColor: string;
        badgeGray: string;
        badgeWhite: string;
        name: string;
        id: string;
        shortName: string;
        slug: string;
        dspId: number;
        store: string;
    };
    name: string;
    lastSeasonPoints: number;
    nickname: string;
    slug: string;
    positionId: number;
    position: string;
    marketValue: number;
    playerStatus: string;
    playerStats: Stats[];
};

export interface Stats {
    stats: {
        mins_played: [number, number];
        goals: [number, number];
        goal_assist: [number, number];
        offtarget_att_assist: [number, number];
        pen_area_entries: [number, number];
        penalty_won: [number, number];
        penalty_save: [number, number];
        saves: [number, number];
        effective_clearance: [number, number];
        penalty_failed: [number, number];
        own_goals: [number, number];
        goals_conceded: [number, number];
        yellow_card: [number, number];
        second_yellow_card: [number, number];
        red_card: [number, number];
        total_scoring_att: [number, number];
        won_contest: [number, number];
        ball_recovery: [number, number];
        poss_lost_all: [number, number];
        penalty_conceded: [number, number];
        marca_points: [number, number];
    };
    weekNumber: number;
    totalPoints: number;
    isInIdealFormation: boolean;
};
