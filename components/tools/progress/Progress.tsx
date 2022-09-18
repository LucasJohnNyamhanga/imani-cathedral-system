import { useNProgress } from "@tanem/react-nprogress";
import { type } from "os";
import { Bar } from './Bar'
import { Container } from './Container'

type data = {
    isAnimating:boolean
}
export const Progress = ({ isAnimating }:data) => {
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating,
    });
    return (
        <>
            <Container animationDuration={animationDuration}
                isFinished={isFinished}>
                <Bar animationDuration={animationDuration}
                    progress={progress} />
            </Container>
        </>
    )
}