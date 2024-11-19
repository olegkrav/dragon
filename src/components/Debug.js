import {useControls} from "leva";
import useClicker from "../stores/useClicker";


export default function Debug(props) {

    const {
        level,
        setLevel
    } = useClicker();

    const [, set] = useControls(() => (
        {
            level: {
                value: level,
                min: 1,
                max: 4,
                step: 1,
                onChange: (level) => {
                    setLevel(level)
                },
            }

        }
    ))

    return  <></>

}
