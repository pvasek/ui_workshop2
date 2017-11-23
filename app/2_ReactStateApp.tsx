import * as React from "react";

export interface AppState {
    count: number;
}

export class App extends React.Component<{}, AppState> {
    constructor(props, context) {
        super(props, context);
        this.increment = this.increment.bind(this);
        this.state = { count: 0 };
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return <div>
            <Counter />
            <Counter />
        </div>;
    }
}

export interface CounterState {
    count: number;
}

export class Counter extends React.Component<{}, CounterState> {
    constructor(props, context) {
        super(props, context);
        this.increment = this.increment.bind(this);
        this.state = { count: 0 };
    }

    // shouldComponentUpdate() {
    //     return this.state.count % 2 === 0;
    // }

    increment() {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return <div>
            <h1>{this.state.count}</h1>
            <button onClick={this.increment}>Increment</button>
        </div>;
    }
}
