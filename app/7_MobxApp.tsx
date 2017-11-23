import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export class AppModel {
    @observable counter1: number = 0;
    @observable counter2: number = 0;

    @action.bound incrementCounter1() {
        this.counter1 += 1;
    }

    @action.bound incrementCounter2() {
        this.counter2 += 2;
    }

    @action.bound reset() {
        this.counter1 = 0;
        this.counter2 = 0;
    }
}

const model = new AppModel();

@observer
export class App extends React.Component {

    render() {
        return <div>
            <Counter count={model.counter1} increment={model.incrementCounter1} />
            <Counter count={model.counter2} increment={model.incrementCounter2} />
            <button onClick={model.reset}>Reset</button>
        </div>;
    }
}

export interface CounterProps {
    count: number;
    increment: () => void;
}

export class Counter extends React.Component<CounterProps> {
    render() {
        return <div>
            <h1>{this.props.count}</h1>
            <button onClick={() => this.props.increment()}>Increment</button>
        </div>;
    }
}
