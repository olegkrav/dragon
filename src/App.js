import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Overlay from "./components/Overlay";
import Scene from "./components/Scene";
import {useMemo, useRef} from "react";
import {button, useControls} from "leva";


export default function App() {

    const orbitref = useRef();
    const values = useControls({
           reset: button((get) => orbitref.current?.reset()),
        })



    return (
        <>
            <Canvas
                dpr={1}
                shadows
                gl={{antialias: false, alpha: false, powerPreference: 'high-performance'}}
                camera={{near: 0.1, fov: 58.5}}
            >

                {<OrbitControls
                    ref={orbitref}
                    zoomSpeed={0.4}
                    minDistance={4}
                    maxDistance={25}
                    maxPolarAngle={Math.PI / 2.0}
                    target={[0, 0, 0]}
                    autoRotate={false}
                    autoRotateSpeed={-0.5}
                />}
                {/*<Stats/>*/}
                <Scene/>
            </Canvas>
            <Overlay/>
        </>
    );
}
