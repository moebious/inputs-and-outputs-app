import React, { useState } from 'react';
import './App.css';

type HType = "M" | "P" | "T" | undefined;
type KType = number | undefined

function App(): JSX.Element {
  const [A, setA] = useState(false);
  const [B, setB] = useState(false);
  const [C, setC] = useState(false);
  const [D, setD] = useState<number | undefined>(undefined);
  const [F, setF] = useState<number | undefined>(undefined);
  const [E, setE] = useState<number | undefined>(undefined);
  const [H, setH] = useState<HType>(undefined);
  const [K, setK] = useState<KType>(undefined);
  const [c1H, setC1H] = useState<HType>(undefined);
  const [c1K, setC1K] = useState<KType>(undefined);
  const [c2H, setC2H] = useState<HType>(undefined);
  const [c2K, setC2K] = useState<KType>(undefined);
  const [error, setError] = useState(false);

  const calculateHANDK = (): [HType, KType, HType?, KType?, HType?, KType?] => {
    if (!D || !E || !F ) {
      return [undefined, undefined, undefined, undefined];
    }
    let h: HType = undefined;
    let k: KType = undefined;

    if (A && B && !C) {
      h = "M";
      k = D + (D * E / 100)
      const c2h = "T";
      const c2k = D - (D * F / 30);
      return [h, k, undefined, undefined, c2h, c2k];
    }
  
    if (A && B && C) {
      h = "P";
      k = D + (D * (E - F) / 25.5)
      const c1k = 2 * D + (D * E / 100) 
      return [h, k, h, c1k];
    }
    
    if (!A && B && C) {
      h = "T"
      k = D - (D * F / 30)
      return [h, k]
    }

    if (A && !B && C) {
      const c2h = "M";
      const c2k = F + D + (D * E / 100);
      return [undefined, undefined, undefined, undefined, c2h, c2k];
    }

    return [undefined, undefined];
  }

  const handleCalculate = () => {
    setError(false);
    setH(undefined);
    setK(undefined);
    setC1H(undefined);
    setC1K(undefined);
    setC2H(undefined);
    setC2K(undefined);
    const [h, k, c1h, c1k, c2h, c2k] = calculateHANDK();

    if (h && k) {
      setH(h);
      setK(k);
    } else {
      setError(true);
    }

    if (c1h && c1k) {
      setC1H(c1h);
      setC1K(c1k);
    }
    if (c2h && c2k) {
      setC2H(c2h);
      setC2K(c2k);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inputs & Outputs App</h1>
        <div className="field">
          <div className="control">
          <label className="checkbox">
            <input type="checkbox" defaultChecked={A} onChange={() => setA(!A)} />
             A
          </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="checkbox">
            <input type="checkbox" defaultChecked={B} onChange={() => setB(!B)} />
             B
          </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="checkbox">
            <input type="checkbox" defaultChecked={C} onChange={() => setC(!C)} />
             C
          </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <h3>D (Float)</h3>
            <input type="number" value={D} onChange={(e) => setD(parseFloat(e.target.value))} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <h3>F (Integer)</h3>
            <input type="number" value={F} onChange={(e) => setF(parseInt(e.target.value))} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <h3>E (Integer)</h3>
            <input type="number" value={E} onChange={(e) => setE(parseInt(e.target.value))} />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input type="submit" value={"Calculate"} onClick={handleCalculate} />
          </div>
        </div>
        <div className="resutls">
          <h2>Outputs</h2>
          <h3>Base</h3>
          {!error && (
            <>
              <span>H: {H}   </span> 
              <span>K: {K}</span>
            </>
          )}
          {error && <h2>ERROR: Invalid Inputs</h2>}
          <h3>Custom 1</h3>
          <span>H: {c1H}   </span> 
          <span>K: {c1K}</span>
          <h3>Custom 2</h3>
          <span>H: {c2H}   </span> 
          <span>K: {c2K}</span>
        </div>
      </header>
    </div>
  );
}

export default App;
