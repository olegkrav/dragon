import {useTexture} from '@react-three/drei'
import useClicker from '../stores/useClicker'
import {useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from 'three';
import {BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Vector3} from 'three';

useTexture.preload("/particle/plusone.png")

function Explosion({id, onRemove}) {

    const {scene, pointer} = useThree();

    const gravity = new Vector3(0.01, 0, 0); // Adjusted gravity vector pointing downwards

    let velocity = new Vector3(0, 0.01, 0)
    let life = Math.random() * 20 + 10 // lifespan in frames
    let timeAlive = 0
    const particleRef = useRef();



    const geometry = useRef(new BufferGeometry()).current;
    const material = useRef(new PointsMaterial({


        size: 0.5,
        sizeAttenuation: true,
        map: useTexture("/particle/plusone.png"),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: true,
        color : "white" ,
        toneMapped: false

    })).current;




    const points = useRef(new Points(geometry, material)).current;

    useEffect(() => {
        if (points) {

            points.name = `particle-${id}`;
            points.life = life
            console.log("create", points.name)
            scene.add(points);
        }

        return () => {
            if (points) {
                console.log("remove", points.name)
                scene.remove(points);
            }
        };
    }, [id, scene]);

    if (points) {
        if (points.position.length() === 0) {
            const pos = new Vector3(pointer.x, pointer.y, 0.85)
            points.position.add(pos)
        }
    }

    useFrame((mouse, viewport, state, delta) => {



        if (points) {

            // Reduce life only if life > 0
            if (points.life > 0) {
                points.life -= 0.3;
            }

            timeAlive += 1; // Increment timeAlive each frame
            /*         const gravityFactor = -1 * timeAlive / (3 * 60); // Ful
                     velocity.add(gravity.clone().multiplyScalar(gravityFactor));*/
            // Apply gravity after 1 second (assuming 60 frames per second)
            //if (timeAlive > 0) {
            // Gradually increase gravity force over time
            const gravityFactor = points.life / 30; // Full gravity force after 3 seconds
            const vel = velocity.clone().add(gravity.clone().multiplyScalar(gravityFactor));
            points.material.opacity = Math.max(points.material.opacity - 0.025, 0);
            //}

            // Update position
            points.position.add(vel);



            const positions = points.position;
            geometry.setAttribute('position', new Float32BufferAttribute(new Float32Array(positions), 3));

            const boundary = 0.85;

            if (Math.abs(points.position.y) > boundary) {
                onRemove(id);
            }
        }


    });

    return <></>;
}

export default  function PlusOne() {

    useEffect(() => {
        useClicker.subscribe(
            (state) => state.score,
            (state, oldState) => {
                handleExplosion()
            }
        );
    }, []);


    const [explosions, setExplosions] = useState([]); // New state for explosions

    const handleExplosion = (pos) => {

        const id = Math.random().toString(16).slice(2)
        setExplosions((prevExplosions) => {
            return [...prevExplosions, {id: id, position: pos}];
        });

    };

    const remove = (id) => {
        setExplosions((prev) => prev.filter((proj) => proj.id !== id));
    };


    return <>

        {explosions.map(explosion => (
            <Explosion key={explosion.id} id={explosion.id}  onRemove={remove}/>
        ))}

    </>
}
