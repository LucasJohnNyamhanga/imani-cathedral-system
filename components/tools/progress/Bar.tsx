import { type } from 'os'
import Styles from '../../../styles/progress.module.scss'

type data = {
    animationDuration: any,
    progress:any
}
export const Bar = ({ animationDuration, progress }:data) => {
    return (
        <div className={Styles.bar} style={{
            marginLeft: `${(-1 + progress) * 100}%`,
            transition:`margin-left ${animationDuration}ms linear`,
        }}></div>
    )
}