// Define the base URL and endpoints
const BASE_URL = "https://api-fantasy.llt-services.com";
const LEAGUE_ID = "013805954";
const TEAM_ID = "17193364"

export const endpoints = {
    // App-related endpoints
    appConfig: `/app/config`,

    // User-related endpoints
    userInfo: `/api/v3/user/me`,
    userTime: `/api/v3/time`,
    userLeagues: `/api/v4/leagues`,
    userFormations: `/v4/teams/lineup/formations`, // ?option=free

    // Team-related endpoints
    teamsInfo: (teamId: string = TEAM_ID, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/teams/${teamId}`,
    teamLineup: (teamId: string = TEAM_ID, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/teams/${teamId}/lineup`,
    teamLineupByWeek: (teamId: string = TEAM_ID, weekId: string, leagueId: string = LEAGUE_ID) => `/api/v4/leagues/${leagueId}/teams/${teamId}/lineup/week/${weekId}`,
    teamMoney: (teamId: string = TEAM_ID, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/teams/${teamId}/money`,
    favouritePlayers: (teamId: string = TEAM_ID, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/teams/${teamId}/favourite-players`,
    
    // League types and configurations
    leagueMarket: (leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market`,
    leagueMarketHistory: (leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/history`,
    leagueNews: (leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/news`,
    leagueNewsById: (weekId: string, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/news/${weekId}`,
    leagueRanking: (leagueId: string = LEAGUE_ID) => `/api/v5/leagues/${leagueId}/ranking`,
    leagueRankingByWeek: (weekId: number, leagueId: string = LEAGUE_ID) => `/api/v4/leagues/${leagueId}/ranking/${weekId}`, // Error 404
    
    // Market-related actions
    marketBid: (offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/bid`,
    marketCancelBid: (bidId: string, offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/bid/${bidId}/cancel`,

    // Ranking-related endpoints
    rankingGlobal: `/api/v3/ranking/global`,

    // Stats endpoints
    statsMarketEvolutionWeek: `/stats/v1/market/evolution/week`,
    statsMarketEvolutionMonth: `/stats/v1/market/evolution/month`,
    statsMarketEvolutionSeason: `/stats/v1/market/evolution/season`,
    statsMarketEvolutionYear: `/stats/v1/market/evolution/year`,
    statsPlayerStatsBySeason: `/stats/v1/players/stats`,
    statsPlayerStatsByWeek: (weekId: string) => `/stats/v1/players/stats/week/${weekId}`,
    
    // Store-related endpoints
    storeProducts: `/classic/v1/store/products/user`,
    storePurchases: `/classic/v1/store/purchases/user`,
    storeConsumables: `/classic/v1/store/user-consumable`,

    // Miscellaneous endpoints
    checkVersion: `/check-version`,
    cardCarousel: `/classic/v1/cardCarousel`,
    cardCarouselWithRegion: `/classic/v1/cardCarousel?region=18`,

    // Other
    userConsents: `/dsp/v1/consents`,
    teamDefinitions: `/classic/v1/league-definitions/103/teams`,
    leaguePremiumConfig: `/api/v4/leagues/premium-configuration`,
    leagueTypes: `/api/v4/league-types`, // Error 404
};


export default BASE_URL;