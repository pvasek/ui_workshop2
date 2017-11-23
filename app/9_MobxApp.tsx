import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { ResultItem, generateResultItems } from "./Data";

export class AppModel {
    @observable data: ResultItem[] = [];

    @action.bound changeRank() {
        const newData = [];
        const source = [...this.data];

        while (source.length > 0) {
            const index = Math.floor(Math.random() * source.length);
            const item = source.splice(index, 1)[0];
            item.rank = newData.length + 1;
            newData.push(item);
        }
    }

    @action.bound incrementRank(item: ResultItem) {
        item.rank = item.rank + 1;
    }

    @action.bound addResult(count: number) {
        let c = this.data.length;
        const items = [];
        for (let i = 0; i < count; i++) {   
            c++;     
            this.data.push({            
                id: c.toString(),
                rank: c,
                firstName: `First name ${c}`,
                lastName: `Last name ${c}`,
                noc: "NOC",
            });            
        }
    }
}

const model = new AppModel();

@observer
export class App extends React.Component {
    render() {
        return <div>
            <button onClick={model.changeRank}>Change rank</button>
            <button onClick={e => model.addResult(1)}>Add result</button>
            <button onClick={e => model.addResult(10)}>Add results 10</button>
            <button onClick={e => model.addResult(100)}>Add results 100</button>
            <button onClick={e => model.addResult(1000)}>Add results 1000</button>
            <button onClick={e => model.addResult(10000)}>Add results 10000</button>
            <Table data={model.data} incrementRank={model.incrementRank}/>
        </div>;
    }
}

export interface TableProps {
    data: ResultItem[];
    incrementRank: (item: ResultItem) => void;
}

@observer
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
