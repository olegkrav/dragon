import React, {useEffect, useMemo, useRef, useState} from 'react'
import {PresentationControls, useAnimations, useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {LottieLoader} from "three-stdlib";
import {useControls} from "leva";
import {LoopOnce} from "three/src/constants";
import useClicker from "../stores/useClicker";

export default function Medium(props) {
    const ref = useRef()
    const fire = useRef()

    const {nodes, materials, animations} = useGLTF('/model/medium.glb')
    const {actions,  mixer} = useAnimations(animations, ref);



  const names = [
      'rest1',
    'rest2',
    'rest3',
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
                value: 0.11,
                min: 0,
                max: 1,
                step: 0.01,
            },
            rotation: {
                value: [0,0.41,0],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },
            position: {
                value: [0.05,-0.75,1],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },
        }
    }, [])
    const controls = useControls('medium', options)

    return (
        <group ref={ref} {...props} position={controls.position} rotation={controls.rotation} scale={controls.scale} dispose={null}>

            <group
                name="dragon_M_arm">
                <skinnedMesh
                    name="eye_L"
                    geometry={nodes.eye_L.geometry}
                    material={materials['Материал.006']}
                    skeleton={nodes.eye_L.skeleton}
                />
                <skinnedMesh
                    name="eye_P_1"
                    geometry={nodes.eye_P_1.geometry}
                    material={materials['Материал.006']}
                    skeleton={nodes.eye_P_1.skeleton}
                />
                <skinnedMesh
                    name="retopo_dragon_M"
                    geometry={nodes.retopo_dragon_M.geometry}
                    material={materials.dragon_M}
                    skeleton={nodes.retopo_dragon_M.skeleton}
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

