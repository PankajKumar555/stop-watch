import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, ms: 0 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    return () => clearInterval(id.current);
  }, []);

  let id = useRef();

  const handlerStart = () => {
    id.current = setInterval(() => {
      setTime((t) => {
        if (t.ms === 99) {
          return { ...t, s: t.s + 1, ms: 0 };
        }
        if (t.s === 60) {
          return { ...t, m: t.m + 1, s: 0, ms: 0 };
        }
        if (t.m === 60) {
          return { ...t, h: t.h + 1, m: 0, s: 0, ms: 0 };
        }
        return { ...t, ms: t.ms + 1 };
      });
    }, 10);
    setStarted(true);
  };

  const handlerStop = () => {
    clearInterval(id.current);
    setStarted(false);
  };

  const handlerReset = () => {
    clearInterval(id.current);
    setStarted(false);
    setTime({ h: 0, m: 0, s: 0, ms: 0 });
  };

  return (
    <div className="App">
      <div className="stopwatch">
        <h1>
          <strong>
            {time.h.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {time.m.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {time.s.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {time.ms.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </strong>
        </h1>
        <div>
          <button disabled={started} className="start" onClick={handlerStart}>
            Start
          </button>
          <button className="stop" onClick={handlerStop}>
            Stop
          </button>
          <button className="reset" onClick={handlerReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
