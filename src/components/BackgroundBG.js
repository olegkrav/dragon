import {Environment, Plane, useAspect, useTexture} from '@react-three/drei'
import * as THREE from 'three'
import {useLoader} from '@react-three/fiber'
import {useControls} from "leva";
import {useEffect, useMemo} from 'react'
import useClicker from "../stores/useClicker";


useTexture.preload("/bg/background_dragon_1.png")
useTexture.preload("/bg/background_dragon_2.png")
useTexture.preload("/bg/background_dragon_3.png")
useTexture.preload("/bg/background_dragon_4.png")

export default function BackgroundBG({}) {

    const level = useClicker((state) => state.level)


    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(`/bg/background_dragon_${level}.png`)



    return (
        <>
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[3.135568066199836, 5.574343228799708]}/>
                <meshBasicMaterial attach="material" map={texture}/>
            </mesh>


        </>
    )
}
