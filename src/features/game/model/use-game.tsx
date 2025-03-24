import { GameId } from "@/kernel/ids";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";
import { useTransition } from "react";import { gameStepAction } from "../actions/game-step";
import { GameEntity } from "@/entities/game";
;

export function useGame(gameId: GameId) {
    const { isPending, dataStream } = useEventsSource<GameEntity>(
        routes.gameStream(gameId)
    );
    const [isPendingTransition, startTransition] = useTransition();

    const step = (index: number) => {
        startTransition(async () => {
            await gameStepAction({ gameId, index });
        });
    };

    return {
        game: dataStream,
        step,
        isPending: isPending,
        isStepPending: isPendingTransition,
    };
}
