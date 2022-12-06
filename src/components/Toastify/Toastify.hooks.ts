import { useEffect } from "react";
// hooks
import { useActions, useAppSelector } from "@hooks";
// other
import { ToastType } from "@store";
import { toPascalCase } from "@utils";
// type
import type { RootState } from "@store";
//

type SliceName = Extract<keyof RootState, "api" | "parser" | "saving">;

interface IToastifyHookArgs {
  sliceName: SliceName;
  autoReset?: boolean;
}

export const useToastifyReducerError = ({ sliceName, autoReset = false }: IToastifyHookArgs) => {
  const actions = useActions();
  const errMsg = useAppSelector((state) => state[sliceName].errorMsg);
  const { addToast, resetError } = getActions(sliceName, actions);

  useEffect(() => {
    if (errMsg) {
      addToast({
        text: errMsg,
        type: ToastType.Error,
      });

      if (autoReset) resetError();
    }
  }, [errMsg]);
};


const getActions = (sliceName: SliceName, actions: ReturnType<typeof useActions>) => {
  const resetErrActionName = `reset${toPascalCase(sliceName)}Error` as `reset${Capitalize<SliceName>}Error`;

  const getResetErrAction = () => {
    try {
      return actions[resetErrActionName];
    } catch (error) {
      throw new Error('Action to clear reducer error must have format name "resetXError", where X is the name of the slice');
    }
  };

  return {
    addToast: actions.addToast,
    resetError: getResetErrAction()
  };
};


