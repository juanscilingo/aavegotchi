import { gql } from "graphql-request";

export const aavegotchis = gql`
  query ($first: Int = 20, $skip: Int = 0, $orderBy: Aavegotchi_orderBy = id, $orderDirection: OrderDirection = asc, $where: Aavegotchi_filter) {
    aavegotchis(first: $first skip: $skip orderBy: $orderBy orderDirection: $orderDirection where: $where) {
      id
      collateral
      escrow
      stakedAmount
      minimumStake
      kinship
      lastInteracted
      timesInteracted
      experience
      toNextLevel
      usedSkillPoints
      owner{
        id
      }
      level
      baseRarityScore
      modifiedRarityScore
      locked
      portal{
        id
        status
      }
      hauntId
      name
      status
      numericTraits
      modifiedNumericTraits
      equippedWearables
    } 
  }
`
