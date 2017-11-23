export interface ResultItem {
    id: string;
    rank: number;
    firstName: string;
    lastName: string;
    noc: string;
}

export function generateResultItems(count: number) {
    const result: ResultItem[] = [];
    for (let i = 1; i <= count; i++) {
        result.push({
            id: i.toString(),
            rank: i,
            firstName: `First name ${i}`,
            lastName: `Last name ${i}`,
            noc: "NOC",
        })
    }
    
    return result;
}