import PendingRequestsTable from "./Tables/PendingRequestsTable";

const AdminPendingRequests = () => {
    const requests = [
        {
            id: '1',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '2',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '3',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '4',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },{
            id: '5',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '6',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '7',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '8',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },{
            id: '9',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '10',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '11',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '12',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },{
            id: '13',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '14',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '15',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '16',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },{
            id: '17',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '18',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '19',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '20',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },{
            id: '21',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '22',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '23',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '24',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        }
    ]

    return(
        <div className="h-full">
            <h1 className="text-left font-semibold text-xl mb-4">All Requests</h1>
            <PendingRequestsTable requests={requests}/>
        </div>
    )
}

export default AdminPendingRequests;