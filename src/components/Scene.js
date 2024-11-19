import Lights from './Lights'
import BackgroundBG from './BackgroundBG'
import Dragon from './Dragon'
import {Autofocus, EffectComposer} from '@react-three/postprocessing'
import PlusOne from "./PlusOne";
import {useMemo} from "react";
import {buttonGroup, useControls} from "leva";
import useClicker from "../stores/useClicker";
import Debug from "./Debug";


export default function Scene(props) {



    return (
        <>

            <Dragon position={[0, 0.0, 0]} />
            <Lights/>
            <BackgroundBG />
            <PlusOne/>
            <Debug/>
            <EffectComposer multisampling={4}>
                <Autofocus bokehScale={1} focusRange={0.025} target={[0, 0.0, 1]}/>
            </EffectComposer>
        </>
    )
}
