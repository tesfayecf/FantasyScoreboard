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
    userConsents: `/dsp/v1/consents`,
    
    // Team-related endpoints
    teamInfo: (teamId: string = TEAM_ID) => `/api/v3/teams/${teamId}`,
    teamMoney: (teamId: string = TEAM_ID) => `/api/v3/teams/${teamId}/money`,
    teamLineup: (teamId: string = TEAM_ID) => `/api/v3/teams/${teamId}/lineup`, // PUT /** {"defender":["28772680","60393846","60394348","28772677"],"goalkeeper":"28772668","midfield":["28772673","60395278","60402362","63667317"],"striker":["28772670","60399499"],"tactical_formation":[4,4,2]} */
    teamLineupByWeek: (teamId: string = TEAM_ID, weekId: string) => `/api/v4/teams/${teamId}/lineup/week/${weekId}`,
    teamFavouritePlayers: (teamId: string = TEAM_ID) => `/api/v4/teams/${teamId}/favourite-players`,
    teamRewards: (teamId: string) => `/api/v4/team/${teamId}/rewards`,
    
    // League-related endpoints
    leagueInfo: (leagueId: string) => `/api/v4/leagues/${leagueId}`,
    leagueTeam: (teamId: string = TEAM_ID, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/teams/${teamId}`,
    leagueNews: (leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/news`,
    leagueNewsById: (weekId: string, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/news/${weekId}`,
    leagueRanking: (leagueId: string = LEAGUE_ID) => `/api/v5/leagues/${leagueId}/ranking`,
    leagueRankingByWeek: (leagueId: string = LEAGUE_ID, weekId: number) => `/api/v5/leagues/${leagueId}/ranking/${weekId}`,
    leagueMarket: (leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market`,
    leagueMarketHistory: (leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/history`,
    leagueBuyoutPlayer: (leagueId: string) => `/api/v4/league/${leagueId}/buyout/player`, // PUT {"playerId", "valueToIncrease"}
    leaguePremiumConfig: `/api/v4/leagues/premium-configuration`,
    leagueTypes: `/api/v4/leagues-types`,
    
    // Market-related actions
    marketOfferHistory: (offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/history`,
    marketOfferSell: (offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/sell`, // POST {"playerId", "salePrice"}
    marketOfferDelete: (offerId: string, leagueId: string) => `api/v3/league/${leagueId}/market/${offerId}/delete`, // DELETE
    marketOfferMakeBid: (offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/bid`, // POST {"money"}
    marketOfferCancelBid: (bidId: string, offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/bid/${bidId}/cancel`, // DELETE
    marketImmediateSale: (leagueId: string) => `/api/v3/league/${leagueId}/market/immediate-sale`, // POST {"playerId", "salePrice"}
    
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
    time: `api/v3/time`,
    checkVersion: `/check-version`,
    cardCarousel: `/classic/v2/cardCarousel`,
    cardCarouselWithRegion: `/classic/v1/cardCarousel?region=18`,
    teamDefinitions: `/classic/v1/league-definitions/103/teams`,
    leaguesTypes: `/api/v4/leagues-types`,
    
    // New endpoints
    ideal: (id: number) => `/api/v4/ideal/${id}`,
}


export default BASE_URL;