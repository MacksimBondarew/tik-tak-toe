"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";

import { mapLeft, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { startTransition } from "react";

export function CreateButton() {
    const [state, dispatch, isPending] = useActionState(
        createGameAction,
        right(undefined)
    );

    return (
        <Button
            className="relative"
            disabled={isPending}
            onClick={() => startTransition(dispatch)}
            error={mapLeft(
                state,
                (e) =>
                    ({
                        ["can-create-only-one-game"]:
                            "Can only create one game",
                        ["user-not-found"]: "User not found",
                    }[e])
            )}>
            Создать игру
        </Button>
    );
}
