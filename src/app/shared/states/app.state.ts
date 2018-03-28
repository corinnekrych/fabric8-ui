import { SpaceState } from './space.state';
import { UserState } from './user.state';

export interface AppState {
  currentSpace: SpaceState;
  currentEntity: UserState;
}
