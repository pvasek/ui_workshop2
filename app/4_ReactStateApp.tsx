import * as React from "react";
import { ResultItem, generateResultItems } from "./Data";

export interface AppState {
    data: ResultItem[];
}

const resultItems = generateResultItems(10000);

export class App extends React.Component<{}, AppState> {
    constructor(props, context) {
        super(props, context);
        this.refresh = this.refresh.bind(this);
        this.changeRank = this.changeRank.bind(this);

        this.state = { 
            data: resultItems,
        };
    }

    refresh() {
        this.setState({
            data: [...resultItems],
        })
    }

    changeRank() {
        // clone data from state
        const data: ResultItem[] = this.state.data.map(i => ({...i}));
        const newData = [];
        const source = [...data];

        while (source.length > 0) {
            const index = Math.floor(Math.random() * source.length);
            const item = source.splice(index, 1)[0];
            item.rank = newData.length + 1;
            newData.push(item);
        }

        this.setState({
            data: newData
        });
    }

    render() {
        return <div>
            <button onClick={this.refresh}>Refresh</button>
            <button onClick={this.changeRank}>Change rank</button>
            <Table data={this.state.data} />
        </div>;
    }
}

export interface TableProps {
    data: ResultItem[];
}

export class Table extends React.Component<TableProps> {
    render() {
        return <table className="table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>NOC</th>
                </tr>
            </thead>
            <tbody>
                {this.props.data.map(i =>
                    <tr key={i.id}>
                        <td>{i.rank}</td>
                        <td>{i.firstName}</td>
                        <td>{i.lastName}</td>
                        <td>{i.noc}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
