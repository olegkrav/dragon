import useClicker from "../stores/useClicker";
import {useEffect} from "react";

export default function Overlay() {

  const {
    score,
    increment
  } = useClicker();


  useEffect(() => {

    const clicknHandler = ({ key, target }) => {

      increment()
    }

    window.addEventListener('mousedown', clicknHandler, { passive: true })

    return () => {
      window.removeEventListener('mousedown', clicknHandler)
    }
  }, [])

  return (
      <div className="score">
        <div className="individual-score">{score}</div>
      </div>
  )
}
