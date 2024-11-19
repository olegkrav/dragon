import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
    subscribeWithSelector((set) => {
        return {
            /**
             *  Choices and winner
             */
            player: null,
            score: 0,
            setScore: (score) => {
                set(() => {
                    return {
                        score: score,
                    };
                });
            },
            level: 1,
            increment: () => set((state) => ({ score: state.score + 1 })),
            setLevel: (level) => {
                set(() => {
                    return {
                        level: level,
                    };
                });
            },



            phase: "ready", // "playing", "ended"

            setPhase: (gamePhase) => {
                set(() => {
                    return {
                        phase: gamePhase,
                    };
                });
            },

            start: () => {
                set((state) => {
                    if (state.phase === "ready") {
                        return {
                            phase: "playing",
                            // startTime: Date.now()
                        };
                    }
                    return {};
                });
            }
        };
    })
);
