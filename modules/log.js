export const log = JSON.stringify([
    {
        id: 0,
        type: 'initialize',
        hints: '000105000140000670080002400063070010900000003010090520007200080026000035000409000'
    },
    {
        id: 1,
        type: 'strategy-execution-start',
        strategy: 'no-duplicates'
    },
    {
        id: 2,
        type: 'cell-targeted-for-strategy',
        cell: '00',
    },
    // {
    //     id: 3,
    //     type: 'cell-value-read',
    //     cell: '00'
    // },
    // {
    //     id: 4,
    //     type: 'cell-notes-read',
    //     cell: '00'
    // },
    {
        id: 5,
        type: 'unit-focused',
        unit: 'r0'
    },
    {
        id: 6,
        type: 'cell-inspected',
        cell: '01'
    }
], null, 2);