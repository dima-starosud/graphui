import axios from "axios";
import {Component, CSSProperties, useEffect, useState} from "react";
import React from "react";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

export {getWorkers, Main};

const CARRIER = "CARRIER";
const DRIVER = "DRIVER";

interface IWorker {
  index: number;
  name: string;
  post: typeof CARRIER | typeof DRIVER;
}

async function getWorkers(): Promise<IWorker[]> {
  return (await axios.get<IWorker[]>("http://localhost:8123/workers")).data;
}

function Main(props: { workers: IWorker[] }): JSX.Element {
  const myStyle: CSSProperties = {
    border: "2px solid black", float: "left", margin: "10px", padding: "5px",
  };
  const carriers = props.workers.filter((w) => w.post === CARRIER);
  const drivers = props.workers.filter((w) => w.post === DRIVER);
  // const width100percent: CSSProperties = {width: "100%"};
  // const width120px: CSSProperties = {width: "120px"};
  // const width40px: CSSProperties = {width: "40px"};
  // const alignmentRight: any = {alignment: "right"};
  // const border1px: CSSProperties = {border: "1px"};

  const [giHtml, data] = GenerationInput2();
  const oResult = data.pipe(map(GenerationResult));
  const Asdf = kokoko(oResult);

  return (
    <div>
      <div style={myStyle}>
        <UploadForm/>
      </div>

      <form id="generate-form">

        <div style={myStyle}>
          <WorkersTable workers={carriers}/>
        </div>

        <div style={myStyle}>
          <WorkersTable workers={drivers}/>
        </div>

        <div style={myStyle}>
          giHtml
          <GenerationInput/>
        </div>

      </form>

      <div style={myStyle}>
        <ComponentOfObservable html={oResult}/>
        <GenerationResult/>
      </div>

    </div>
  );
}

function UploadForm(): JSX.Element {
  const width: CSSProperties = {width: "100%"};
  const alignment: CSSProperties = {alignment: "right"} as any;
  return (
    <form action="upload" method="post">
      <div>
        <textarea name="text" style={width}/>
      </div>
      <div>
        <input type="submit" value="Завантажити таблицю" style={{...width, ...alignment}}/>
      </div>
    </form>
  );
}

function WorkersTable(props: { workers: IWorker[] }): JSX.Element {
  const rows = props.workers.map((w) => (
    <tr key={w.index}>
      <td>
        <label>
          <input
            // @ts-ignore
            name={w.index} type="checkbox"/>
          {w.name}
        </label>
      </td>
    </tr>
  ));
  return (
    <table style={{border: "1px"}}
      // @ts-ignore
           border="1">
      <tbody>
      {rows}
      </tbody>
    </table>
  );
}

function GenerationInput2(): [JSX.Element, Observable<number[]>] {
  return null as any;
}

function GenerationInput(): JSX.Element {
  return <div>Data please...</div>;
}

function GenerationResult(props: any): JSX.Element {
  return <div>Data please...</div>;
}

class ComponentOfObservable extends Component<{ html: Observable<JSX.Element> }, JSX.Element> {
  private subscription: Subscription | null = null;

  public componentDidMount(): void {
    this.subscription = this.props.html.subscribe(
      (x) => this.setState(x));
  }

  public componentWillUnmount(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public render(): JSX.Element {
    return this.state;
  }
}

function Aasdf(obs: Observable<JSX.Element>) {
  const [state, setState] = useState<JSX.Element>();

  useEffect(() => {
    const sub = obs.subscribe(setState);
    return () => sub.unsubscribe();
  }, [obs]);

  return state;
}

function kokoko(html: Observable<JSX.Element>) {
  const asdf: number = Aasdf(null as any);
}
