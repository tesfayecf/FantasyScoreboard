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

    // Player-related endpoints
    playerStats: (playerId: string) => `/api/v3/player/${playerId}`,
    playerMarketValue: (playerId: string) => `/api/v3/player/${playerId}/market-value`,

    // Team-related endpoints
    teamCalendar: (teamId: string = TEAM_ID) => `/api/v3/calendar/${teamId}`,
    teamPlayers: (teamId: string = TEAM_ID) => `/api/v3/player/team/${teamId}`,

    // Week-related endpoints
    weekMatches: (weekId: string) => `/stats/v1/stats/week/${weekId}`,

    // Manager-Team-related endpoints
    teamInfo: (teamId: string = TEAM_ID) => `/api/v3/teams/${teamId}`,
    teamMoney: (teamId: string = TEAM_ID) => `/api/v3/teams/${teamId}/money`,
    teamLineup: (teamId: string = TEAM_ID) => `/api/v3/teams/${teamId}/lineup`, // PUT {"defender","goalkeeper","midfield","striker","tactical_formation"}
    teamLineupByWeek: (teamId: string = TEAM_ID, weekId: string) => `/api/v4/teams/${teamId}/lineup/week/${weekId}`,
    teamFavouritePlayers: (teamId: string = TEAM_ID) => `/api/v4/teams/${teamId}/favourite-players`,
    teamRewards: (teamId: string) => `/api/v4/team/${teamId}/rewards`,

    // League-related endpoints
    leagueTypes: `/api/v4/leagues-types`,
    leaguePremiumConfig: `/api/v4/leagues/premium-configuration`,
    leagueInfo: (leagueId: string) => `/api/v4/leagues/${leagueId}`,
    leagueTeam: (teamId: string = TEAM_ID, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/teams/${teamId}`,
    leagueNews: (leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/news`,
    leagueNewsById: (weekId: string, leagueId: string = LEAGUE_ID) => `/api/v3/leagues/${leagueId}/news/${weekId}`,
    leagueRanking: (leagueId: string = LEAGUE_ID) => `/api/v5/leagues/${leagueId}/ranking`,
    leagueRankingByWeek: (leagueId: string = LEAGUE_ID, weekId: number) => `/api/v5/leagues/${leagueId}/ranking/${weekId}`,
    leagueMarket: (leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market`,
    leagueMarketHistory: (leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/history`,
    leagueIncreaseBuyoutPlayer: (leagueId: string = LEAGUE_ID) => `/api/v4/league/${leagueId}/buyout/player`, // PUT {"playerId", "valueToIncrease"}
    leaguePayBuyoutPlayer: (playerId: string, leagueId: string = LEAGUE_ID) => `/api/v4/league/${leagueId}/buyout/${playerId}/pay`, // PUT {"buyoutClauseToPay"}

    // Market-related actions (offerId -> marketPlayer)
    marketOfferHistory: (offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/history`,
    marketOfferSell: (offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/sell`, // POST {"playerId", "salePrice"}
    marketOfferAccept: (bidId: string, offerId: string, leagueId: string = LEAGUE_ID) => `api/v3/league/${leagueId}/market/${offerId}/offer/${bidId}`, // POST {"offerMoney"}
    marketOfferDelete: (offerId: string, leagueId: string = LEAGUE_ID) => `api/v3/league/${leagueId}/market/${offerId}/delete`, // DELETE
    marketOfferMakeBid: (offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/bid`, // POST {"money"}
    marketOfferEditBid: (bidId: string, offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/bid/${bidId}`, // PUT {"money"}
    marketOfferCancelBid: (bidId: string, offerId: string, leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/${offerId}/bid/${bidId}/cancel`, // DELETE
    marketImmediateSale: (leagueId: string = LEAGUE_ID) => `/api/v3/league/${leagueId}/market/immediate-sale`, // POST {"playerId", "salePrice"}

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
    ideal: () => `/api/v4/ideal`,
    profitable: () => `/api/v4/profitable`,
}


export default BASE_URL;