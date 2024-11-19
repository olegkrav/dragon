import React, {useMemo, useRef} from 'react'
import {PivotControls, useGLTF} from '@react-three/drei'
import {LottieLoader} from "three-stdlib";
import {useControls} from "leva";

import Egg from "../models/Egg";
import Small from "../models/Small";
import Medium from "../models/Medium";
import Large from "../models/Large";
import useClicker from "../stores/useClicker";
import * as THREE from "three";

useGLTF.preload('/model/egg.glb')
useGLTF.preload('/model/large.glb')
useGLTF.preload('/model/medium.glb')
useGLTF.preload('/model/small.glb')

export default function Dragon(props) {
    const ref = useRef()
    const fire = useRef()
    const modelRef= useRef()

    const level = useClicker((state) => state.level)


    const loader = new LottieLoader()
    const lottie = loader.load('/animation/fire_small.json')
    const scale = [1, 1, 1]

    /*large
    * {"rotation":[0,-0.3,0]}
    * {"position":[-0.1,-0.8,1.3]}
    * {"scale":0.15000000000000002}
    *
    */


    const foptions = useMemo(() => {
        return {

            visible: false,

            position: {
                value: [
                    0.26,
                    -0.184,
                    1.151,
                ],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },

        }
    }, [])


    const fcontrols = useControls('fire', foptions)

    const models = [
        Egg,
        Small,
        Medium,
        Large
    ]


    const Component = models[Number(level) - 1]

    return (
        <group ref={ref} {...props} dispose={null}>

                <mesh scale={scale} ref={fire} position={fcontrols.position} visible={fcontrols.visible}>
                    <planeGeometry args={[1, 1]}/>
                    <meshBasicMaterial side={2} transparent
                                       toneMapped={true} map={lottie}/>
                </mesh>


                <Component ref={modelRef}/>


        </group>
    )
}

