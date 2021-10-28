export interface IMatch {
    hero_id: number
    match_id: number
    match_timestamp: number
    perfomance_rating: number
    won_match: boolean
}

export interface MatchPlayer {
    account_id: number
    assists: number
    deaths: number
    hero_id: number
    items: Array<number>
    player_slot: number
    pro_name: string
}

export interface IMinimalMatch {
    dire_score: number
    duration: number
    game_mode: number
    match_id: number
    players: Array<MatchPlayer>
    radiant_score: number
    start_time: number
}