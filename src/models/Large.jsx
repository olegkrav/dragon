import React, {useEffect, useMemo, useRef, useState} from 'react'
import {PresentationControls, useAnimations, useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {LottieLoader} from "three-stdlib";
import {useControls} from "leva";
import {LoopOnce} from "three/src/constants";
import useClicker from "../stores/useClicker";

export default function Large(props) {
    const ref = useRef()
    const fire = useRef()

    const {nodes, materials, animations} = useGLTF('/model/large.glb')
    const {actions,  mixer} = useAnimations(animations, ref);

    const names = [
        'rest2',
        'rest3',
        'rest1',
    ]

    useClicker.subscribe(
        (state) => state.score,
        (state, oldState) => {
            if (actions) {
                let anim = actions?.["fire"]
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
                value: 0.19,
                min: 0,
                max: 1,
                step: 0.01,
            },
            rotation: {
                value: [0,-0.09,0],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },
            position: {
                value: [-0.1,-0.98,0.6],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },
        }
    }, [])
    const controls = useControls('large', options)

    return (
        <group ref={ref} {...props} position={controls.position} rotation={controls.rotation} scale={controls.scale} dispose={null}>


            <group
                name="dragon_L_arm"
                >
                <skinnedMesh
                    name="dragon_L"
                    geometry={nodes.dragon_L.geometry}
                    material={materials['Материал.001']}
                    skeleton={nodes.dragon_L.skeleton}
                />
                <skinnedMesh
                    name="eye_L001"
                    geometry={nodes.eye_L001.geometry}
                    material={materials['Материал.015']}
                    skeleton={nodes.eye_L001.skeleton}
                />
                <skinnedMesh
                    name="eye_P001"
                    geometry={nodes.eye_P001.geometry}
                    material={materials['Материал.015']}
                    skeleton={nodes.eye_P001.skeleton}
                />
                <primitive object={nodes.root}/>
                <primitive object={nodes.spine002}/>
                <primitive object={nodes.spine004}/>
                <primitive object={nodes.paw004IKL}/>
                <primitive object={nodes.front_paw004IKL}/>
                <primitive object={nodes.BackLegpawL}/>
                <primitive object={nodes.BackLegfront_pawL}/>
                <primitive object={nodes.paw004IKR}/>
                <primitive object={nodes.front_paw004IKR}/>
                <primitive object={nodes.BackLegpawR}/>
                <primitive object={nodes.BackLegfront_pawR}/>
                <primitive object={nodes.spineIK010}/>
            </group>


        </group>
    )
}

