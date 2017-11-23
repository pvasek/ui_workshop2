import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export class CounterModel {
    @observable counter: number = 0;

    @action.bound increment() {
        this.counter += 1;
    }

    @action.bound reset() {
        this.counter = 0;
    }
}

export interface CounterProps {
    model: CounterModel;
}

@observer
export class Counter extends React.Component<CounterProps> {
    render() {
        return <div>
            <h1>{this.props.model.counter}</h1>
            <button onClick={this.props.model.increment}>Increment</button>
        </div>;
    }
}

export class AppModel {
    counter1 = new CounterModel();
    counter2 = new CounterModel();

    @action.bound reset() {
        this.counter1.reset();
        this.counter2.reset();
    }
}

const model = new AppModel();

@observer
export class App extends React.Component {

    render() {
        return <div>
            <Counter model={model.counter1} />
            <Counter model={model.counter2} />
            <button onClick={model.reset}>Reset</button>
        </div>;
    }
}

