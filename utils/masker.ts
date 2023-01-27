import IMask from "imask";
import { MaskerObject, MaskerType } from "../types/maskerType";

export type EventType = {
  target?: {
    value: any;
  };
};

const masker = ({ masked, transform, maskDefault }: MaskerType): MaskerObject =>
  (function () {
    const mask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.UNMASKED,
      IMask.PIPE_TYPE.MASKED
    );

    const unmask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.MASKED,
      IMask.PIPE_TYPE.UNMASKED
    );

    const maskInput = (event: EventType) => {
      const unmasked = unmask(event?.target ? event.target.value : event);
      const newValue = mask(unmasked);
      return newValue as string;
    };

    return {
      mask,
      maskInput,
      transform: transform || unmask,
      unmask,
      maskDefault: maskDefault || mask,
    };
  })();

export default masker;
