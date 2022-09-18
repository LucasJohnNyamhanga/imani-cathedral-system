import { type } from 'os'
import Styles from '../../../styles/progress.module.scss'

type data = {
    animationDuration: any,
    children: any,
    isFinished:boolean,
}
export const Container = ({ animationDuration, children, isFinished }:data) => {
    return (
        <div className={Styles.container} style={{
            opacity: isFinished ? 0 : 1,
            transition:`opacity ${animationDuration}ms linear`
        }}>
            {children}
        </div>
    )
}