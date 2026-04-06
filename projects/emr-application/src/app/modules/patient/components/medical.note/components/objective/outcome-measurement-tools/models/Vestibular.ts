import { CerebralConcussion } from "./CerebralConcussion";
import { PostCerebralConcussionScale } from "./PostCerebralConcussionScale";
import { Posttraumaticamnesia } from "./posttraumaticamnesia";

export interface Vestibular {
  vestibular: boolean;
  cerebralConcussion: CerebralConcussion;
  posttraumaticamnesia: Posttraumaticamnesia;
  postCerebralConcussionScale: PostCerebralConcussionScale;
}
