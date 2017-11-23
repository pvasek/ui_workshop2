import * as React from "react";
import { ResultItem, generateResultItems } from "./Data";

export interface AppState {
    data: ResultItem[];
}

const resultItems = generateResultItems(10);

export class App extends React.Component<{}, AppState> {
    constructor(props, context) {
        super(props, context);
        this.refresh = this.refresh.bind(this);
        this.changeRank = this.changeRank.bind(this);
        this.addResult = this.addResult.bind(this);
        this.incrementRank = this.incrementRank.bind(this);

        this.state = { 
            data: resultItems
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

    addResult(count: number) {
        let c = this.state.data.length;
        const items = [];
        for (let i = 0; i < count; i++) {   
            c++;     
            items.push({            
                id: c.toString(),
                rank: c,
                firstName: `First name ${c}`,
                lastName: `Last name ${c}`,
                noc: "NOC",
            });            
        }
        const data = [...this.state.data, ...items];
        this.setState({ data });    
    }

    incrementRank(item: ResultItem) {
        const newItem = {...item, rank: item.rank + 1 };
        const data = [...this.state.data];
        const index = data.findIndex(i => i.id == item.id);
        data[index] = newItem;
        this.setState({ data });
    }

    render() {
        return <div>
            <button onClick={this.refresh}>Refresh</button>
            <button onClick={this.changeRank}>Change rank</button>
            <button onClick={e => this.addResult(1)}>Add result</button>
            <button onClick={e => this.addResult(10)}>Add results 10</button>
            <button onClick={e => this.addResult(100)}>Add results 100</button>
            <button onClick={e => this.addResult(1000)}>Add results 1000</button>
            <button onClick={e => this.addResult(10000)}>Add results 10000</button>
            <Table data={this.state.data} incrementRank={this.incrementRank}/>
        </div>;
    }
}

export interface TableProps {
    data: ResultItem[];
    incrementRank: (item: ResultItem) => void;
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
                        <td onClick={e => this.props.incrementRank(i)}>{i.rank}</td>
                        <td>{i.firstName}</td>
                        <td>{i.lastName}</td>
                        <td>{i.noc}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
