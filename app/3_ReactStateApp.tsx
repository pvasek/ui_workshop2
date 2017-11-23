import * as React from "react";

export interface AppState {
    counter1: number;
    counter2: number;
}

export class App extends React.Component<{}, AppState> {
    constructor(props, context) {
        super(props, context);
        this.incrementCounter1 = this.incrementCounter1.bind(this);
        this.incrementCounter2 = this.incrementCounter2.bind(this);
        this.reset = this.reset.bind(this);

        this.state = { 
            counter1: 0,
            counter2: 0,
        };
    }

    incrementCounter1() {
        this.setState({
            counter1: this.state.counter1 + 1
        })
    }

    incrementCounter2() {
        this.setState({
            counter2: this.state.counter2 + 1
        })
    }

    reset() {
        this.setState({
            counter1: 0,
            counter2: 0,
        })
    }

    render() {
        return <div>
            <Counter count={this.state.counter1} increment={this.incrementCounter1} />
            <Counter count={this.state.counter2} increment={this.incrementCounter2} />
            <button onClick={this.reset}>Reset</button>
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
