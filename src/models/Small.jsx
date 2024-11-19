import React, {useEffect, useMemo, useRef} from 'react'
import {useAnimations, useGLTF} from '@react-three/drei'
import {LoopOnce} from "three/src/constants";
import {useControls} from "leva";

export default function Small(props) {
    const ref = useRef()
    const fire = useRef()

    const {nodes, materials, animations} = useGLTF('/model/small.glb')
    const {actions, mixer} = useAnimations(animations, ref);

    const names = [
        'rest_2',
        'rest_3',
        'rest_1',
    ]

    mixer.addEventListener('finished', (e) => {


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
                value:0.09,
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
                value:[0.05,-0.55,1],
                min: -5,
                max: 5,
                step: 0.01,
                lock: true
            },
        }
    }, [])
    const controls = useControls('medium', options)

    return (
        <group ref={ref} {...props} position={controls.position} rotation={controls.rotation} scale={controls.scale} dispose={null}

        >
            <group
                name="dragon_S_arm"
>
                <skinnedMesh
                    name="eye_L002"
                    geometry={nodes.eye_L002.geometry}
                    material={materials['Материал.018']}
                    skeleton={nodes.eye_L002.skeleton}
                />
                <skinnedMesh
                    name="eye_P002"
                    geometry={nodes.eye_P002.geometry}
                    material={materials['Материал.018']}
                    skeleton={nodes.eye_P002.skeleton}
                />
                <skinnedMesh
                    name="lowpoly"
                    geometry={nodes.lowpoly.geometry}
                    material={materials['Материал.009']}
                    skeleton={nodes.lowpoly.skeleton}
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

