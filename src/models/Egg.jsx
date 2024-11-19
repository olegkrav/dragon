import React, {useEffect, useMemo, useRef, useState} from 'react'
import {PivotControls, PresentationControls, useAnimations, useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {LottieLoader} from "three-stdlib";
import {useControls} from "leva";
import {LoopOnce} from "three/src/constants";
import useClicker from "../stores/useClicker";
import * as THREE from "three";


export default function Egg(props) {
    const ref = useRef()

    const {nodes, materials, animations} = useGLTF('/model/egg.glb')
    const {actions, mixer} = useAnimations(animations, ref);


    const names = [
        'rest1',
        'rest2'
    ]

    useClicker.subscribe(
        (state) => state.score,
        (state, oldState) => {
            if (actions) {
                let anim = actions?.["tap"]
                if (anim) {
                    anim.reset()
                    anim.loop = LoopOnce;
                    anim.play()
                }

            }

        }
    );


    mixer.addEventListener('finished', (e) => {

            console.log(e.action.getClip().name)

            const prev = e.action.getClip().name

            let name = names[~~(names.length * Math.random())]
            while (prev === name) {
                name = names[~~(names.length * Math.random())]
            }

            let anim = actions?.[name]

            if (anim) {
                anim.reset()
                anim.loop = LoopOnce;
                anim.play()
            }


        }
    );

    useEffect(() => {
        const name = names[~~(names.length * Math.random())]

        let anim = actions?.[name]
        if (anim) {
            anim.reset()
            anim.loop = LoopOnce;
            anim.play()
        }


    }, [actions]);


    const options = useMemo(() => {
        return {

            scale: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.01,
            },
            rotation: {
                value: [0, 0, 0],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },
            position: {
                value: [0, -0.65, 0.6],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },
        }
    }, [])


    //const controls = useControls('yaika', options)
    //const controls = useControls('yaika', options)
    const [controls, set] = useControls('yaika', () => (options))

    return (


            <group ref={ref} {...props} position={controls.position} rotation={controls.rotation} scale={controls.scale}
                   dispose={null}>
                <group name="yaika-arm"
                >
                    <mesh
                        name="yaika"
                        castShadow
                        receiveShadow
                        geometry={nodes.yaika.geometry}
                        material={materials.yaika}
                        position={[-6.331, -1.446, -3.703]}
                    />
                </group>
            </group>

    )
}

