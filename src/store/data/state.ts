import { Balance, BlockReduced, Delegation, GovernanceOverview, Proposal, Reward, UnbondingDelegation, Validator } from 'src/models';

export interface DataStateInterface {
  block: BlockReduced | undefined;
  balances: Balance[];
  balancesLoaded: boolean;
  delegations: Delegation[];
  delegationsLoaded: boolean;
  undelegations: UnbondingDelegation[];
  undelegationsLoaded: boolean;
  validators: Validator[];
  validatorsLoaded: boolean;
  rewards: Reward[];
  rewardsLoaded: boolean;
  proposals: Proposal[];
  proposalsLoaded: boolean;
  governanceOverview: GovernanceOverview | null;
  governanceOverviewLoaded: boolean;
}

function state (): DataStateInterface {
  return {
    block: undefined,
    balances: [],
    balancesLoaded: false,
    delegations: [],
    delegationsLoaded: false,
    undelegations: [],
    undelegationsLoaded: false,
    validators: [],
    validatorsLoaded: false,
    rewards: [],
    rewardsLoaded: false,
    proposals: [],
    proposalsLoaded: false,
    governanceOverview: null,
    governanceOverviewLoaded: false
  }
}

export default state;
